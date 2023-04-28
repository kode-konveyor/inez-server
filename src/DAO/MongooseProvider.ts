import mongoose from "mongoose";
import {
  CONNECTED_MESSAGE,
  COULD_NOT_CONNECT,
  MONGOOSE_URL,
  mongooseOptions,
} from "./Constants.js";

export class MongooseProvider {
  static instance?: MongooseProvider;

  static async makeSureIsConnected(): Promise<MongooseProvider> {
    if (MongooseProvider.instance === undefined)
      MongooseProvider.instance = new MongooseProvider();
    await MongooseProvider.instance.connect();
    return MongooseProvider.instance;
  }

  async connect(): Promise<this> {
    if (mongoose.connection.readyState === 1) return this;
    try {
      await mongoose.connect(MONGOOSE_URL, mongooseOptions);
      console.log(CONNECTED_MESSAGE);
    } catch (err) {
      console.log(COULD_NOT_CONNECT, err);
    }
    return this;
  }

  async disconnect(): Promise<void> {
    await mongoose.disconnect();
  }
}
