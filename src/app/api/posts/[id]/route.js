import { connectMongoDB } from "../../../../../lib/mongodb";
import Post from "../../../../../models/post";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = params;
    await connectMongoDB();
    const post = await Post.findOne({ _id: id });
    return NextResponse.json({ post }, { status: 200 });
}

export async function PUT(req, { params }) {
    const { id } = params;
    const { newTitle: title, newContent: content, newDueDate: duedate, newStatus: status } = await req.json(); // เพิ่ม newStatus
    await connectMongoDB();
    await Post.findByIdAndUpdate(id, { title, content, duedate, status }); // เพิ่ม status ในการอัปเดต
    return NextResponse.json({ message: "Post updated" }, { status: 200 });
}
