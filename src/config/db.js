import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.warn("⚠️  MONGODB_URI not set — skipping DB connection");
      return;
    }
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      tls: true,
      tlsAllowInvalidCertificates: true,
    });
    console.log("MongoDB connected ✅");
  } catch (err) {
    console.error("MongoDB error:", err.message);
    console.warn("⚠️  Server will start WITHOUT database. Chat history won't be saved.");
  }
};
