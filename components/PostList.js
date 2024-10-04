import React, { useEffect, useState } from 'react';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const response = await fetch('/api/posts');
        const data = await response.json();
        setPosts(data.posts);
    };

    // Function to handle status change for each task
    const handleStatusChange = async (id, newStatus) => {
        await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newStatus }),
        });
        fetchPosts(); // Refresh to reflect the status change in the UI
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Post List</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post._id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <p>สถานะ: {post.status === 'complete' ? 'เสร็จแล้ว' : 'ยังไม่เสร็จ'}</p>
                        <button
                            onClick={() => handleStatusChange(post._id, post.status === 'complete' ? 'incomplete' : 'complete')}
                            className='bg-blue-500 text-white py-2 px-3 rounded-md'>
                            {post.status === 'complete' ? 'ทำให้ไม่เสร็จ' : 'ทำให้เสร็จ'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
