import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Post = new Schema({
    user_email: {type: String, default:null},
    post: {type: String, default:null},
    description: {type: String, default:null},
    comment: [{type: String, default:null}],
})

export default mongoose.model("Post", Post)