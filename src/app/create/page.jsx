"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter, redirect } from 'next/navigation'

function CreatePostPage() {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [duedate, setDueDate] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content || !duedate) {
            alert("Please complete all inputs.");
            return;      
        }

        try {
            const res = await fetch("http://localhost:3000/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, content, duedate })
            })

            if (res.ok) {
                router.push("/");
            } else {
                throw new Error("Failed to create a post");
            }

        } catch(error) {
            const errorData = await res.json();
            console.error("Error creating post:", errorData);
            throw new Error("Failed to create a post");
        }
    }

  return (
    <div className='container mx-auto py-10 flex h-screen'>
        <div className='w-full max-w-xl'>
        <h3 className='text-3xl font-bold '>สร้างงานขึ้นใหม่</h3>
        <hr className='my-3' />
        
        <form onSubmit={handleSubmit}>
        <input 
                onChange={(e) => setTitle(e.target.value)} 
                type="text" 
                className='w-[1000px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' 
                placeholder='ขื่องาน' />
        <textarea 
                onChange={(e) => setContent(e.target.value)} 
                className='w-[1000px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' 
                placeholder='รายละเอียดงาน'>
        </textarea>
        
        <input 
                onChange={(e) => setDueDate(e.target.value)} 
                type="datetime-local" 
                className='w-[1000px] block bg-gray-200 border py-2 px-3 rounded text-lg my-2' 
                placeholder='กำหนดวันที่ต้องทำ' 
            />

        <button type='submit' className='bg-green-500 text-white border py-2 px-3 rounded text-lg my-2'>สร้างโพสต์</button>
        </form>
        <Link href="/" className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>กลับไปหน้าโพสค์</Link>
    </div>
    </div>
  )
}

export default CreatePostPage