const mongoose = require("mongoose")

const uri = process.env.MONGODB_URI || "mongodb+srv://kalilaatha8_db_user:clustercivila@clustercivila.pa4f3mx.mongodb.net/civila-db"

async function testConnection() {
  try {
    await mongoose.connect(uri)
    console.log("✅ MongoDB connection successful!")
    await mongoose.disconnect()
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err)
  }
}

testConnection()