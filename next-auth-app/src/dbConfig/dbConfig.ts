import mongoose from "mongoose";

export async function connectToDatabse(){
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        
        connection.on("open",()=>{
            console.log("MongoDB database connection established successfully");
        })

        connection.on("error",(err)=>{
            console.log("MongoDB connection error:",err);
            process.exit();
        })
        
    } catch (error) {
        console.log("Database connection error:", error);
    }
}
    