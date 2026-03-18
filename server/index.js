import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from "mongoose";
import authroutes from "./routes/Authroutes.js";
import contactsRoutes from "./routes/ContactRoute.js";
import setupSocket from "./socket.js";
import messageRoute from "./routes/MessageRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const databaseurl =process.env.DATABASE_URL;

app.use(cors({
    origin:[process.env.ORIGIN],
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials: true,
}));


app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use(cookieParser())
app.use(express.json());

app.use('/api/auth', authroutes);
app.use('/api/contacts', contactsRoutes);
app.use('/api/messages', messageRoute);

const server = app.listen(port, ()=>{
    console.log('server started ', port);
});

setupSocket(server);
mongoose.connect(databaseurl)
.then(()=> console.log("database connected"))
.catch((err)=>console.log(err.message));
