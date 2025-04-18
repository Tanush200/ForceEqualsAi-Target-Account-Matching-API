import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI as string;

export async function connectDB() : Promise<void>{
    if(mongoose.connection.readyState >=1 ) return ;
    await mongoose.connect(MONGODB_URI);
}