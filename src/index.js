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

require("./controllers/auth/index");

// FIXME: 
const pusher = new Pusher({
    appId: "1265919",
    key: "be42df8733a2a17f2fcc",
    secret: "16cc4ca9fc870abc9a85",
    cluster: "ap2",
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


app.post("/message", (req,res)=>{
  const payload = req.body;

   pusher.trigger("pusher-channel", 'message', payload);

   return res.end();
});

app.post("/pusher/auth", (req,res)=>{
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const auth = pusher.authenticate(socketId, channel);
    return res.send(auth);
});


app.get("/ping", (req, res) => {
    return res.send("pong");
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log(`server listening on ${PORT}`);
})