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

    console.log(newProduct.name);

    //get all users who have notifications enabled
    const usersQuery = db
      .collection("users")
      .where("notificationsEnabled", "==", true);
    const users = await usersQuery.get();

    const filteredUsers = [];

    //for every user
    for (const doc of users.docs) {
      const user = doc.data();

      //don't notify the user that donated the product
      if (doc.id === newProduct.donorId) {
        continue;
      }

      //don't notify users that only want to be notified on campus and are not currently on campus
      if (user.campusNotificationsEnabled && !user.isOnCampus) {
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

    //gets the push token for each filtered user
    const pushTokens = filteredUsers.map((user) => user.pushToken);

    //if push tokens exist for any filtered users, send the notification
    if (pushTokens.length > 0) {
      const notification = {
        to: pushTokens,
        title: "New product added 🔔",
        body: `${newProduct.name} has been added to the fridge!`,
        data: {
          productName: newProduct.name,
          date: newProduct.date,
          productImage: newProduct.image,
        },
      };

      try {
        const response = await fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            host: "exp.host",
            accept: "application/json",
            "accept-encoding": "gzip, deflate",
            "content-type": "application/json",
          },
          body: JSON.stringify(notification),
        });

        const data = await response.json();
        console.log("successfully sent message: ", data);
      } catch (error) {
        console.error("Error sending notification:", error);
      }
    } else {
      console.log("No users are suitable for notifying");
    }
  }
);
