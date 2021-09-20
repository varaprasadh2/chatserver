const express = require('express');
const Pusher = require('pusher');
const cors = require('cors');
const dotENV = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');




// loads environment variables
dotENV.config({
    path: path.resolve(__dirname, '..','.env')
});


// routes

const RootRouter = require("./routes/"); 
const { decodeToken } = require('./utils/jwt');


const app = express();

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    useTLS: true,
});


app.use(cookieParser());

app.use(cors({
   credentials: true,
   origin:true
}));

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use((req,res, next) => {
    req.pusher = pusher;
    next();
});

app.post("/pusher/auth", async (req, res) => {
    const socketId = req.body.socket_id;
    const channelId = req.body.channel_name; // unique channel name, in our case it's just id 
    const accessToken = req.body.accessToken;

    const user = await decodeToken(accessToken);

    const data = {
        user_id: user.userId,
        ...user, 
        socketId,
        channelId
    };

    const auth = pusher.authenticate(socketId, channelId, data);
    return res.send(auth);
});


app.use("/",RootRouter);


const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log(`server listening on ${PORT}`);
})