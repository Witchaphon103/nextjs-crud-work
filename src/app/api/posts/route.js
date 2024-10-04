import { connectMongoDB } from "../../../../lib/mongodb";
import Post from "../../../../models/post";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { title, content, duedate } = await req.json();
        console.log("Title:", title, "Content:", content, "Due Date:", duedate);

        await connectMongoDB();
        await Post.create({ title, content, duedate });

        return NextResponse.json({ message: "Post created" }, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ message: "Failed to create post" }, { status: 500 });
    }
}

export async function GET() {
    await connectMongoDB();
    const posts = await Post.find({});
    return NextResponse.json({ posts });
}


export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Post.findByIdAndDelete(id);
    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
}