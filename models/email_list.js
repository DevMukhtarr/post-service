import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Emails = new Schema({
    email_address: {type: String, default:null}
})

export default mongoose.model("Email", Emails)