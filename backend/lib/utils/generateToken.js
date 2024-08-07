import jwt from 'jsonwebtoken'
export const generateTokenAndSetCookie =(userId , res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })
    const cookieName = userId.role === "Admin" ? "admin token" : "jwt";

    res.cookie(cookieName,token,{
        maxAge :15*24*60*60*1000,
        httpOnly: true,
        sameSite:"strict",
        secure: process.env.NODE_ENV !== "development"
    })
}