const express = require('express');
const Pusher = require('pusher');
const cors = require('cors');
const dotENV = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');





dotENV.config({
    path: path.resolve(__dirname, '..','.env')
});


// routes

const RootRouter = require("./routes/"); 


const app = express();

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    useTLS: true,
});


app.use(cookieParser());

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use((req,res, next) => {
    req.pusher = pusher;
    next();
});

app.use("/",RootRouter);


app.post("/pusher/auth", (req,res)=>{
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const auth = pusher.authenticate(socketId, channel);
    return res.send(auth);
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log(`server listening on ${PORT}`);
})