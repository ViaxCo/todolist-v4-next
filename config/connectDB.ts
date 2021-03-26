import mongoose from "mongoose";

const connectDB = async () => {
  // check if we have a connection to the database or if it's currently
  // connecting or disconnecting (readyState 1, 2 and 3)
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("No uri found");
  }

  try {
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(`CONNECTED to ${conn.connection.db.databaseName} on: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
