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
const adminRouter = require('./routes/admin');

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// MongoDB Atlas connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://surveersinghguglani:avqJrq01m0nDNGRV@cluster0.okmweum.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

connectMongoDB(MONGODB_URI).then(async () => {
    console.log('MongoDB connected');
    // Create admin user if it doesn't exist
    const User = require('./models/user');
    const bcrypt = require('bcrypt');
    const adminEmail = 'admin1@gmail.com';
    const adminPassword = '123';

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await User.create({
            name: 'Admin',
            email: adminEmail,
            password: hashedPassword,
            isAdmin: true,
        });
        console.log('Admin user created');
    }
});

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

app.use("/url",restrictToLoggedinUserOnly ,urlRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
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