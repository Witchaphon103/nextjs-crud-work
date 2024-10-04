"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DeleteBtn from './DeleteBtn';

export default function Home() {
  const [postData, setPostData] = useState([]);

  const getPosts = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        cache: "no-store"
      });

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await res.json();
      setPostData(data.posts);

    } catch(error) {
      console.log("Error loading posts: ", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newStatus }),
    });
    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className="container mx-auto">
      <h3>NextJS TODO Crud</h3>
      <hr className="my-3" />
      <button className="bg-green-500 p-3 text-white rounded">
        <Link href="/create">สร้างโพสต์</Link>
      </button>
      
      <div className="grid grid-cols- mt-3 gap-5">
        {postData && postData.length > 0 ? (
          postData.map(val => (
            <div key={val._id} className='shadow-xl my-10 p-10 rounded-xl'>
              <h4 className={`text-2xl ${val.status === 'completed' ? 'line-through' : ''}`}>
                {val.title}
              </h4>
              <p>{val.content}</p>
              <p>{val.duedate}</p>
              <p>สถานะ: {val.status === 'completed' ? 'เสร็จแล้ว' : 'ยังไม่เสร็จ'}</p>
              <button
                  onClick={() => handleStatusChange(val._id, val.status === 'completed' ? 'not completed' : 'completed')}
                  className='bg-blue-500 text-white py-2 px-3 rounded-md'>
                  {val.status === 'completed' ? 'ทำให้ไม่เสร็จ' : 'ทำให้เสร็จ'}
              </button>
              <div className='mt-5'>
                <Link className='bg-gray-500 text-white border py-2 px-3 rounded-md text-lg my-2' href={`/edit/${val._id}`}>แก้ไข</Link>
                <DeleteBtn id={val._id} />
              </div>
            </div>
          ))
        ) : (
          <p className='bg-gray-300 p-3 mt-3'>
            ไม่มีโพสต์ที่เเสดง
          </p>
        )}
      </div>
    </main>
  );
}
