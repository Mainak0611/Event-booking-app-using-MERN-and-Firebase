import { connectDB } from "@/config/dbConfig";
import UserModel from "@/models/user-model";
import { currentUser } from "@clerk/nextjs/server";

connectDB();

export const handleNewUserRegistration = async () => {
  try {
    const loggedInUser = await currentUser();

    if (!loggedInUser) {
      throw new Error("No user is currently logged in");
    }

    // Check if the user already exists in the database
    const userExists = await UserModel.findOne({
      clerkUserId: loggedInUser.id,
    });
    if (userExists) return userExists;

    // Safely check for email addresses
    const emailAddress =
      loggedInUser.emailAddresses && loggedInUser.emailAddresses.length > 0
        ? loggedInUser.emailAddresses[0].emailAddress
        : null;

    if (!emailAddress) {
      throw new Error("Email address not found for the logged-in user");
    }

    // Create a new user if one doesn't exist
    const newUser = new UserModel({
      userName:
        loggedInUser.username ||
        `${loggedInUser.firstName || ""} ${loggedInUser.lastName || ""}`.trim(),
      email: emailAddress,
      clerkUserId: loggedInUser.id,
    });

    await newUser.save();
    return newUser;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred during registration");
  }
};

export const getMongoDBUserIDOfLoggedInUser = async () => {
  try {
    const loggedInUser = await currentUser();

    if (!loggedInUser) {
      throw new Error("No user is currently logged in");
    }

    const userInMongoDb = await UserModel.findOne({
      clerkUserId: loggedInUser.id,
    });

    if (!userInMongoDb) {
      throw new Error("User not found in the database");
    }

    return userInMongoDb._id;
  } catch (error: any) {
    throw new Error(error.message || "An error occurred while retrieving the user");
  }
};
