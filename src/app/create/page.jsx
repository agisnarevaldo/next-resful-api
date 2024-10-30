"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";

export default function Page() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);

        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                body: formData,
            });
            if (res.ok) {
                alert("Post created successfully");
                setTitle("");
                setContent("");
                router.push("/");
            } else {
                const data = await res.json();
                alert(data.message);
            }
        } catch (error) {
            console.error(`An error occurred: ${error}`);
        }
    };

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
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit} style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                gap: "10px",
            }}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                        padding: "10px",
                        width: "100%",
                    }}
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={{
                        padding: "10px",
                        width: "100%",
                        height: "200px",
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "blue",
                        color: "white",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Submit
                </button>
            </form>
        </main>
    );
}