import prisma from "../../../../prisma/client";
import {NextResponse} from "next/server";

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
    // get all request
    const {title, content} = await request.json();

    // create data post
    const post = await prisma.post.create({
        data: {
            title: title,
            content: content,
        }
    });

    // return response JSON
    return NextResponse.json(
        {
            success: true,
            message: "Post Created Successfully",
            data: post,
        },
        {
            status: 201,
        }
    );
}