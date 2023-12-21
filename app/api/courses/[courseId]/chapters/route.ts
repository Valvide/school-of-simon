import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: {
      courseId: string;
    };
  }
) {
  try {
    // Authentication before posting
    const { userId } = auth();
    const { title } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId,
      },
    });
    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // Finding the last chapter added or searching for the last postion
    const lastChapter = await db.chapter.findFirst({
      where: {
        courseId: params.courseId,
      },
      orderBy: {
        position: "desc",
      },
    });

    //After Finding the last Position we add the new postion with an increment of one

    const newPosition = lastChapter ? lastChapter.position + 1 : 1;

    const chapter = await db.chapter.create({
      data: {
        title,
        courseId: params.courseId,
        position: newPosition,
      },
    });
    // Sending the response

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[CHAPTERS ROUTE]", Error);
    return new NextResponse("Internal Error ", { status: 500 });
  }
}
