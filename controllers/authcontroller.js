import "dotenv/config";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import satelize from "satelize";
import requestIp from "request-ip"

//get otp in signup page
export const signUp = async (req, res, next) =>{
    try{
        const { name,email,password} = req.body
        
        if (!(name, email, password)) {
            return res.status(400).send("All inputs are required");
          }

        const oldUser  = await (User.findOne({ email }))

        if(oldUser == null){   
            //Encrypted user password
            const encryptedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                name:name,
                email:email.toLowerCase(),
                password:encryptedPassword
            })

            const token = jwt.sign(
                {user_id: user._id, email},
                process.env.JWT_TOKEN_KEY,
                {
                    expiresIn: "365d",
                })
    
                return res.status(200).json({
                    status: true,
                    message: "registration succesful",
                    data: {
                        token: token,
                    }
                  })
        }else{
            return res.status(424).json({
                status: false,
                message: "Email Address exists"
              })
        }
        // JWT refresh token
            }
            catch (err){
                return res.status(500).json({
                    status: false,
                    message: "An error occurred"
                  })
            }
        }
        
export const signIn = async (req, res) =>{

    try {
        const { email,password} = req.body
        
        const oldUser  = await (User.findOne({ email }))

        if (!(email && password)) {
            return res.status(400).send("All inputs are required");
          }

        if(oldUser == null){
            return res.status(424).json({
                status: false,
                message: "Email or password is incorrect",
            }) 
        }

        if (oldUser.email && (await bcrypt.compare(password, oldUser.password))) {
            const token = jwt.sign(
                { user_id: oldUser._id, email: oldUser.email},
                process.env.JWT_TOKEN_KEY,
                {
                  expiresIn: "365d",
                })

                const clientIp = requestIp.getClientIp(req);
                satelize.satelize({ip: clientIp}, async (err, data) =>{
                    if(err){
                        return res.status(424).json({
                            status: false,
                            message: "An error occurred" + err
                        })
                    }

                await User.findOneAndUpdate(email, {
                    continent: data.continent.en,
                    country: data.country.en,
                    country_code: data.country_code
                })
            })    
            return res.status(200).json({
                status: true,
                message: "Login successfull",
                token: token
            }) 
         }
    } 
catch (err) {
            return res.status(500).json({
                status: false,
                message: "An error occurred" + err
              })
    }
}
