import mongoose from "mongoose";
let isConnect = false;

export const connectedToDatabase = async () =>{
    mongoose.set('strictQuery',true)

    if (isConnect) {
        console.log('database is already connected')
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            DatabaseName: "ownMedia",
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
      
          isConnect = true;
      
          console.log("database is connected");
    } catch (error) {
        console.log(error);
    }
}