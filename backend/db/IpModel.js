const mongoose=require("mongoose");

const IpSchema=new mongoose.Schema(
    {
        ipnumber:{type:String,required:true},
        createdAt: { type: Date, default: Date.now },
        couponid:{type:String,required:true},
        sessionid:{type:String,required:true}
    }
);
// IpSchema.index({createdAt:1},{expireAfterSeconds:60});

const IpModel=mongoose.model("ip-model",IpSchema);

module.exports=IpModel;