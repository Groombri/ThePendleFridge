const { onValueCreated } = require("firebase-functions/v2/database");
const { initializeApp } = require("firebase-admin/app");
const admin = require("firebase-admin");

//import helper functions
const { WithinGivenTimes } = require("./TestDateUtils");

initializeApp();

const db = admin.firestore();

exports.notifyUsersOnDonation = onValueCreated(
  {
    region: "europe-west1", // Set region here
    ref: "/product/{productId}", // Path in the database
  },
  async (event) => {
    const newProduct = event.data.val(); // Get the new product data
    if (!newProduct) return;

    const users = await db.collection("users").get();

    const filteredUsers = [];

    users.forEach((doc) => {
      const user = doc.data();

      //don't notify users who have notifications disabled
      if (!user.notificationsEnabled) {
        return;
      }
      //don't notify users where current time doesnt fall between their set notification times
      if (
        user.notificationTimesEnabled &&
        !WithinGivenTimes(user.notificationTimes)
      ) {
        return;
      }

      //if user has passed all filters, add them to the list of users to be notified
      filteredUsers.push(user);
    });

    console.log("FILTERED USERS:", filteredUsers);
  }
);
