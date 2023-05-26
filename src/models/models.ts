import mongoose from "mongoose";
import { initModels } from "./db/init-models";

const options = {
    // autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

export async function initMongo() {
    return await mongoose.connect("mongodb+srv://zero:yNzaUgR3JOYcTcHP2xD9u4msKj4bsySo@cluster0.jgpzb.mongodb.net/ChatRoom", options);
}

export const models = initModels();