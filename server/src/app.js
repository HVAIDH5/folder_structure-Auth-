import express from "express";
import apiRoute from "./routes/api.js";
import { DB_CONNECT } from "./utils/constants.js";
import mongoose from "mongoose";
import cors from "cors";
import { apiProtected} from "./routes/api.js";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";


const app = express();

//  mongoose.connect(DB_CONNECT,{useNewUrlParser:true},(e)=>console.log(e));
mongoose.connect(DB_CONNECT).then(() =>{useNewUrlParser:true},(e)=>console.log(e),console.log("connected"));

const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use("/api/", apiRoute);
app.use("/api/", AuthMiddleware,apiProtected);

app.listen(PORT, () => {
  console.log("server is running ");
});
