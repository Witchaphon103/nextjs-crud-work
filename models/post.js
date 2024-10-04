import mongoose, { Schema } from "mongoose";

const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    duedate: { type: Date, required: true },
    status: { type: String, default: "incomplete" } // เพิ่มฟิลด์ status
}, {
    timestamps: true
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export default Post;
