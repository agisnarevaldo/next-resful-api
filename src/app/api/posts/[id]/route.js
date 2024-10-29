import prisma from "../../../../../prisma/client";
import {NextResponse} from "next/server";

export async function GET(request, { params }){
    // get id from params
    const id = parseInt(params.id);

    const post = await prisma.post.findUnique({
        where: {
            id: id,
        },
    });

    if (!post) {
        // return response JSON
        return NextResponse.json(
            {
                success: false,
                message: "Detail Data Post Not Found",
                data: null,
            },
            {
                status: 404,
            }
        );
    }

    // return response JSON
    return NextResponse.json(
        {
            success: true,
            message: "Detail Data Post",
            data: post,
        },
        {
            status: 200,
        }
    );
}

export async function PATCH(request, { params }){
    // get id from params
    const id = parseInt(params.id);

    // get request data
    const {title, content} = await request.json();

    // update data post
    const post = await prisma.post.update({
        where: {
            id: id,
        },
        data: {
            title: title,
            content: content,
            updatedAt: new Date(),
        },
    });

    // return response JSON
    return NextResponse.json(
        {
            success: true,
            message: "Post Updated Successfully",
            data: post,
        },
        {
            status: 200,
        }
    );
}

export async function DELETE(request, { params }){
    // get id from params
    const id = parseInt(params.id);

    // delete data post
    await prisma.post.delete({
        where: {
            id: id,
        },
    });

    // return response JSON
    return NextResponse.json(
        {
            success: true,
            message: "Post Deleted Successfully",
            data: null,
        },
        {
            status: 200,
        }
    );
}