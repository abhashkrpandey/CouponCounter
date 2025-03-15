const mongoose=require("mongoose");

const CouponSchema=new mongoose.Schema({
    couponNumber:{type:Number,required:true},
    isValid:{type:Boolean,default:true,required:true},
    pointer:{type:Number,default:0,required:true},
    

},
{timestamps:true});

const CouponModel=mongoose.model("coupons",CouponSchema);

module.exports=CouponModel;