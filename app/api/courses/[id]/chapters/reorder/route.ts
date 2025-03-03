
import { NextRequest, NextResponse } from "next/server";
import { auth } from '@clerk/nextjs/server';
import db from "@/lib/db";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Title is required", { status: 400 });
        }

        const { list } = await request.json();

        const OwnerCourse = await db.course.findUnique({
            where: {
                id: params.id,
                userId
            }
        });

        if (!OwnerCourse) {
            return new NextResponse("Course not found", { status: 404 });
        }

        for (let item of list) {
            await db.chapter.update({
                where: {
                    id: item.id
                },
                data: {
                    position: item.position
                }
            });
        }

        return new NextResponse("Chapters reordered successfully", { status: 200 });
    } catch (e) {
        return new NextResponse("Something went wrong", { status: 500 });
    }
}
