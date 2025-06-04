const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

const path = require('path');
const cookieParser = require('cookie-parser');
const {connectMongoDB} = require('./connection');
const URL = require('./models/url');

const {restrictToLoggedinUserOnly,checkAuth}=require('./middlewares/auth');

const urlRouter = require('./routes/url');
const staticRoutes = require('./routes/staticRouter');
const userRouter = require('./routes/user');

// Use environment variable for MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/short-url';

connectMongoDB(MONGODB_URI).then(() => {
    console.log('MongoDB connected');
    });

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

app.use("/url",restrictToLoggedinUserOnly ,urlRouter);
app.use("/user", userRouter);
app.use("/", checkAuth,staticRoutes);

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate
    ({ 
        shortId
     },
        {$push:
            {
                visitHistory: {
                    timestamp: Date.now(),
                },
            }
        })
        res.redirect(entry.redirectUrl);
    });

app.listen(port, () => {   
  console.log(`Server started on port: ${port}`);
});