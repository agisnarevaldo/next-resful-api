import prisma from "../../../../prisma/client";
import {NextRequest, NextResponse} from "next/server";

export async function GET(){
    // get all posts
    const posts = await prisma.post.findMany();

    // return response JSON
    return NextResponse.json(
        {
            success: true,
            message: "List Data Posts",
            data: posts,
        },
        {
            status: 200,
        }
    );
}

export async function POST(request){
    const formData = await request.formData();

    // get title and content from form data
    const title = formData.get("title");
    const content = formData.get("content");

    // create new post
    try {
        const post = await prisma.post.create({
            data: {
                title: title,
                content: content,
            },
        });

        // return response JSON
        return NextResponse.json(
            {
                success: true,
                message: "Post Created",
                data: post,
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        // return response JSON
        return NextResponse.json(
            {
                success: false,
                message: error.message,
                data: null,
            },
            {
                status: 500,
            }
        );
    }
}