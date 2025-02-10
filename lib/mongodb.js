import mongoose from "mongoose"

/*The file you provided is a MongoDB connection handler using Mongoose in a Next.js application.
This code is responsible for establishing a connection between our Next.js application and our MongoDB database. */

// This is a component for connection with the DB.
const connectMongo = async () => {
    // Check if the connection is already established
    if (mongoose.connection.readyState === 1) {
        // If already connected, return the existing connection
        return mongoose.connection.asPromise()
    }

    // Otherwise, connect to MongoDB using the URI stored in the environment variable
    return mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

export default connectMongo
import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URI)

export async function connectToDatabase() {
    if (!client.isConnected) {
        await client.connect()
    }
    const db = client.db() // Use the default database
    return db
}
