const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jwttoken = require("jsonwebtoken");
const AdminModel = require("../backend/db/Admin");
const profileAuthentication = require("../backend/middleware/middleware1");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const CouponModel = require("./db/Coupon");
const MongoStore = require("connect-mongo");
const IpModel = require("./db/IpModel");
const session = require("express-session");
const cooldownMiddleware = require("../backend/middleware/cooldown");

const app = express();
dotenv.config();
mongoose.connect(process.env.MONGOURL);

app.use(
    session({
        secret: "49hcr4n981hycv-tcyh42b92892y289bcfyxn93ryyyyyyyyynx0r29scfrhn4io4hprwq",
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            client: mongoose.connection.getClient(),
            collectionName: "sessions",
            ttl: 60 * 60,
        }),
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        },
    })
);

const allowedOrigins = ["http://localhost:5173"];
app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello");
});

app.get("/claimcoupon", cooldownMiddleware, async (req, res) => {
    const ipOfClient = req.ip;
    const couponWithOnePointer = await CouponModel.findOne({ pointer: 1, isValid: true });
    if (!couponWithOnePointer) {
        const totalCoupon = await CouponModel.find({ pointer: 0, isValid: true }).sort({ couponNumber: 1 });
        if (totalCoupon.length > 0) {
            await CouponModel.findOneAndUpdate({ couponNumber: totalCoupon[0].couponNumber }, { pointer: 1 });
            const ip = new IpModel({ ipnumber: ipOfClient, couponid: totalCoupon[0]._id, sessionid: req.session.id });
            ip.save();
            return res.json({
                success: true,
                coupon: totalCoupon[0],
            });
        } else {
            return res.json({
                success: false,
            });
        }
    } else {
        const remainingCouponWithZeroPointer = await CouponModel.find({ pointer: 0, isValid: true }).sort({ couponNumber: 1 });
        if (remainingCouponWithZeroPointer.length === 0) {
            const ip = new IpModel({ ipnumber: ipOfClient, couponid: couponWithOnePointer._id, sessionid: req.session.id });
            ip.save();
            return res.json({
                success: true,
                coupon: couponWithOnePointer,
            });
        } else {
            const num = couponWithOnePointer.couponNumber;
            const nextPointerWithGreaterNumber = remainingCouponWithZeroPointer.filter(ele => ele.couponNumber > num).sort((a, b) => a.couponNumber - b.couponNumber);
            if (nextPointerWithGreaterNumber.length === 0) {
                await CouponModel.findOneAndUpdate({ couponNumber: remainingCouponWithZeroPointer[0].couponNumber }, { pointer: 1 });
                await CouponModel.findOneAndUpdate({ couponNumber: couponWithOnePointer.couponNumber }, { pointer: 0 });
                const ip = new IpModel({ ipnumber: ipOfClient, couponid: remainingCouponWithZeroPointer[0]._id, sessionid: req.session.id });
                ip.save();
                return res.json({
                    success: true,
                    coupon: remainingCouponWithZeroPointer[0],
                });
            } else {
                await CouponModel.findOneAndUpdate({ couponNumber: nextPointerWithGreaterNumber[0].couponNumber }, { pointer: 1 });
                await CouponModel.findOneAndUpdate({ couponNumber: couponWithOnePointer.couponNumber }, { pointer: 0 });
                const ip = new IpModel({ ipnumber: ipOfClient, couponid: nextPointerWithGreaterNumber[0]._id, sessionid: req.session.id });
                ip.save();
                return res.json({
                    success: true,
                    coupon: nextPointerWithGreaterNumber[0],
                });
            }
        }
    }
});

app.post("/add", profileAuthentication, async (req, res) => {
    const totalcoupons = await CouponModel.find({});
    const nextcoupon = new CouponModel({ couponNumber: totalcoupons.length + 1 });
    try {
        nextcoupon.save();
        return res.json({
            added: true,
            coupon: nextcoupon
        });
    } catch (err) {
        return res.json({
            added: false
        });
    }
});

app.get("/inside", profileAuthentication, async (req, res) => {
    const username = req.decoded.username;
    const isThere = await AdminModel.findOne({ username: username });
    if (isThere != null) {
        return res.json({
            validation: true
        });
    } else {
        return res.json({
            validation: false
        });
    }
});

app.get("/totalcoupon", profileAuthentication, async (req, res) => {
    const totalcoupon = await CouponModel.find({});
    return res.json({
        coupons: totalcoupon,
    });
});
app.get("/totalip",profileAuthentication,async(req,res)=>
{
    const ipAddress = await IpModel.find({});
    return res.json({
        ipaddress: ipAddress
    });
})
app.post("/changeCoupon", profileAuthentication, async (req, res) => {
    const id = req.body._id;
    if (req.body.change == "Enable") {
        try {
            await CouponModel.findOneAndUpdate({ _id: id }, { isValid: true });
            return res.json({
                success: true
            });
        } catch (err) {
            return res.json({
                success: false
            });
        }
    } else if (req.body.change == "Disable") {
        try {
            await CouponModel.findOneAndUpdate({ _id: id }, { isValid: false });
            return res.json({
                success: true
            });
        } catch (err) {
            return res.json({
                success: false
            });
        }
    }
});

app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const isThere = await AdminModel.findOne({ username: username, password: password });
    if (isThere != null) {
        const token = jwttoken.sign({ username }, process.env.SECRETKEY);
        return res.cookie("jwttoken", token, { maxAge: 86400000, sameSite: "None", secure: true }).json({
            validation: true
        });
    } else {
        return res.json({
            validation: false
        });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server started at port :${process.env.PORT}`);
});