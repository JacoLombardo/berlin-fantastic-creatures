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
// loading .env file
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
    origin: "http://localhost:3000",
    credentials: true,
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
  app.use("/", router);
  app.use("/users", userRoute);
  app.use("/posts", postRoute);
  app.use("/comments", commentRoute);
};

const mongoDBConnection = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB is running in port :>> ", port);
  } catch (error) {
    console.log("error connecting to MongoDB", error);
  }
};

(async function controller() {
  await mongoDBConnection();
  addMiddleWares();
  loadRoutes();
  startServer();
})();