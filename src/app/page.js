"use client";

import {useEffect, useState} from "react";
import Link from "next/link";

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
        <main style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            padding: "0 20px",
            gap: "20px",
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
            }}>
                <h1>Posts</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {posts.map((post) => (
                            <li key={post.id}>
                                <h2>{post.title}</h2>
                                <p>{post.content}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <Link
                href="/create"
                style={{
                    padding: "10px 20px",
                    backgroundColor: "blue",
                    color: "white",
                    borderRadius: "5px",
                    textDecoration: "none",
                }}
            >
                Post Create
            </Link>
        </main>
    );
}