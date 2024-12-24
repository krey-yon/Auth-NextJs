import mongoose from "mongoose";

export async function dbConnect() {
    try {
        mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("Connected to database");
        });
        connection.on("error", (error) => {
            console.error("Error connecting to database: ", error);
            process.exit();
        });
    } catch (error) {
        console.error("Error connecting to database: ", error);
        process.exit();
    }
}