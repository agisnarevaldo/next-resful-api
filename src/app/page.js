"use client";

import {useEffect, useState} from "react";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch("/api/posts");
            const data = await res.json();
            setPosts(data.data);
        }

        fetchData();
    }, []);
    return (
        <div>
            <h1>Home</h1>

            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}