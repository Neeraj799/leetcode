import mongoose from "mongoose";
import { Inngest } from "inngest";
import User from "../models/User.js";
import envConfig from "../config/envConfig.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";
import { connectDB } from "./connectDB.js";

export const inngest = new Inngest({
  id: "talent-ai",
  signingKey: envConfig.inngest.INNGEST_SIGNING_KEY,
});

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB;

    const { id, email_addresses, first_name, last_name, image_url } =
      event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`,
      profileImage: image_url,
    };

    await User.create(newUser);

    await upsertStreamUser({
      id: newUser.clerkId.toString(),
      name: newUser.name,
      image: newUser.profileImage,
    });
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await mongoose
      .connect(envConfig.db.URL)
      .then(() => {
        console.log("Mongoose connected");
      })
      .catch((err) => {
        console.log("MongoDB connection error", err);
      });

    const { id } = event.data;

    await User.deleteOne({ clerkId: id });

    await deleteStreamUser(id.toString());
  }
);

export const functions = [syncUser, deleteUserFromDB];
