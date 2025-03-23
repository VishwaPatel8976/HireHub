import jwt from "jsonwebtoken";
import Company from "../models/Company";

export const protectCompany = async (req,resizeBy,next) => {

    const token = req.headers.token
    if(!token){
        return res.json({success:false,message: "Not Unauthorized, Login Again"})
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.company = await Company.findById(decoded.id).select('-password')
        next()
    } catch (error) {
        return res.json({success:false,message: error.message})
    }
}