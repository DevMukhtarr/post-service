import mongoose from "mongoose";
const Schema = mongoose.Schema;

const user = new Schema({
    name: {type: String, default:null},
    email: {type: String, default:null},
    password: {type: String, default:null},
    continent: {type: String, default:null},
    country: {type: String, default:null},
    country_code: {type: String, default:null}
})

export default mongoose.model("User", user)