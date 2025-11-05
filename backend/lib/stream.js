import { StreamChat } from "stream-chat";
import envConfig from "../config/envConfig.js";

const apiKey = envConfig.stream.STREAM_API_KEY;
const apiSecret = envConfig.stream.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.log("STREAM_API_KEY or STREAM_API_SECRET is missing");
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
    console.log("Stream user upserted successfully", userData);
  } catch (error) {
    console.log("Error inserting Stream user: ", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId);
    console.log("Stream user deleted successfully", userId);
  } catch (error) {
    console.log("Error deleting the Stream user: ", error);
  }
};

// todo: add another method to generateToken
