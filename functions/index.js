const { onValueCreated } = require("firebase-functions/v2/database");
const { initializeApp } = require("firebase-admin/app");
const admin = require("firebase-admin");

//import helper functions
const { WithinGivenTimes } = require("./TestDateUtils");
const { LabelMatch } = require("./LabelMatch");

initializeApp();

const db = admin.firestore();

/**
 * This is a firebase cloud function that listens to the contents of the fridge.
 * Each time a product is added to the fridge database, server-side filtering is applied
 * to all users to find out whether to notify them or not based on if the new product details
 * match their notification settings.
 */
exports.notifyUsersOnDonation = onValueCreated(
  {
    region: "europe-west1", //database region
    ref: "/product/{productId}", //database path to products
  },
  //on product added to fridge
  async (event) => {
    const newProduct = event.data.val(); //get the data of the product

    if (!newProduct) return;

    //get all users
    const users = await db.collection("users").get();

    const filteredUsers = [];

    //for every user
    for (const doc of users.docs) {
      const user = doc.data();

      //don't notify users who have notifications disabled
      if (!user.notificationsEnabled) {
        continue;
      }

      //don't notify users where current time doesnt fall between their set notification times
      if (
        user.notificationTimesEnabled &&
        !WithinGivenTimes(user.notificationTimes)
      ) {
        continue;
      }

      //don't notify users who want specific items that don't match the new item
      if (user.notifyFoodsEnabled) {
        if (user.notifyFoods.length < 1) {
          continue;
        }

        let matchedItem = false;

        //gets semantic similarity between users interested items and new product
        for (const food of user.notifyFoods) {
          console.log(`Food: ${food}, text: ${food.text}`);
          const isMatch = await LabelMatch(newProduct, food.text, 0.6);
          if (isMatch) {
            matchedItem = true;
          }
        }

        //if none of the users interested items are deemed similair to the product, don't notify them
        if (!matchedItem) {
          continue;
        }
      }

      //if user has passed all filters, add them to the list of users to be notified
      filteredUsers.push(user);
    }
    console.log("FILTERED USERS:", filteredUsers);
  }
);
