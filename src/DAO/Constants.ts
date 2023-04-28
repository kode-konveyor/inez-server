export const SELBRI_SCHEMA = "Selbri";
export const MONGOOSE_URL = "mongodb://localhost:27017/api-db";
export const CONNECTED_MESSAGE = "MongoDB is connected";
export const COULD_NOT_CONNECT = `MongoDB connection unsuccessful:`;

export const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
};
