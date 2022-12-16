import express from 'express';
import cors from 'cors';
import router from "./route/userRoute.js";
import mongoose from 'mongoose';
import userRoute from './route/userRoute.js'
import postRoute from './route/postRoute.js'
import commentRoute from './route/commentRoute.js'
import * as dotenv from "dotenv";
import cloudinaryConfig from './config/cloudinary.js';
import passport from "passport";
import passportConfig from './config/passport.js';
import passportGoogleConfig from './config/passportGoggle.js';

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

const addMiddleWares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  const corsOptions = {
    origin: "https://berlin-fantastic-creatures.vercel.app",
  };
  app.use(cors(corsOptions));
  cloudinaryConfig();
  app.use(passport.initialize());
  passportConfig(passport);
  passportGoogleConfig(passport);
};

const startServer = () => {
  app.listen(port, () => {
    console.log("Server is running in port " + port);
    console.log("Porcoddio");
  });
};

const loadRoutes = () => {
  app.use("/api", router);
  app.use("/api/users", userRoute);
  app.use("/api/posts", postRoute);
  app.use("/api/comments", commentRoute);
};

const mongoDBConnection = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB is running in port :>> ", port);
  } catch (error) {
    console.log("error connecting to MongoDB", error);
  }
};

mongoDBConnection();
addMiddleWares();
loadRoutes();
startServer();