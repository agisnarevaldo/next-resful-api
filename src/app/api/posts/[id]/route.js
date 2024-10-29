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