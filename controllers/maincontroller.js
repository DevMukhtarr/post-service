import User from "../models/user.js";
import Post from "../models/post.js";
import email_list from "../models/email_list.js";

const parseIp = (req) =>
    req.headers['x-forwarded-for']?.split(',').shift()
    || req.socket?.remoteAddress

export const createPost = async (req, res) => {
    try {
        const user_email = req.user.email

        const { post,description} = req.body

        await Post.create({
            user_email: user_email,
            post: post,
            description: description,
        })
        return res.status(200).json({
            status: true,
            message: "Post Created Successfully"
          })

    } catch (err) {
        return res.status(500).json({
            status: false,
            message: "An error occurred" + err
          })
        }
    }
    
    export const deletePost = async (req, res) => {
        try {
            const { post_id } = req.body;
            
            if(await Post.findById(post_id) == null){
                return res.status(424).json({
                    status: false,
                    message: "Post does not exist"
                  })     
            }
            await Post.findByIdAndDelete(post_id);
            
            return res.status(200).json({
                status: true,
                message: "Post Deleted"
              })     
            } catch (error) {
                return res.status(500).json({
                    status: false,
                    message: "An error occurred"
                  })     
                }
            }

export const commentUnderPost  = async (req, res) => {
    try {
        const { post_id, comment} = req.body;
    
        await Post.findByIdAndUpdate(post_id,{
            $push:{ comment: comment }
        })
        return res.status(200).json({
            status: true,
            message: "Commented successfully"
          })     
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occurred"
          })     
        }
    }

    export const getPosts = async(req, res) =>{
        try {
            const posts = await Post.find()
            
            return res.status(200).json({
                status: true,
                message: "all posts",
                data: posts
            })     
        } catch (error) {
            return res.status(500).json({
            status: false,
            message: "An error occurred"
        })     
    }
}

export const getSinglePost = async (req, res) =>{
    try {
        const post_id = await req.query.post_id

        const post = await Post.findById(post_id)
        return res.status(200).json({
            status: true,
            message: "Single post",
            data: post
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occurred" + error
        })
    }
}

export const joinEmailList = async (req, res) => {
    try {
        const user_email = await req.user.email
        
        const user = await email_list.findOne({email_address: user_email})

        if(user == null){
            await email_list.create({
                email_address: user_email
            })
        }

        return res.status(200).json({
            status: true,
            message: "Email address addedd"
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occurred" + error
        })
    }
} 

export const emailList = async (req, res) =>{
    try {
        const email_addresses = await email_list.find();

        return res.status(200).json({
            status: true,
            message: "all emails",
            data: email_addresses
        }) 
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occurred"
        })
    }
}

export const allUsers = async (req, res) =>{
    try {
        let users_array  = []
        const users = await User.find()
        users.map((user) =>{
            users_array.push({
                name: user.name,
                continent: user.continent,
                country: user.country,
                country_code: user.country_code
            })
        })

        return res.status(200).json({
            status: true,
            message: "all emails",
            data: users_array
        }) 
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "An error occurred"
        })
    }
}