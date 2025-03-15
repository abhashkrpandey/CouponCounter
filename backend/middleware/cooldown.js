const IpModel =require("../db/IpModel");

const cooldown = 60 * 60 * 1000; 

const cooldownMiddleware = async (req, res, next) => {
  const ip = req.ip; 
  const sessionId = req.session.id; 

  const recentClaim = await IpModel.findOne({$or: [{ ipnumber: ip }, { sessionid: sessionId }],createdAt: { $gt: new Date(Date.now() - cooldown) }});

  if (recentClaim) {
     return res.json({ message: "Not Allowed" });
  }

  next();
};

module.exports=cooldownMiddleware;

