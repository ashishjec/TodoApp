import { Connect } from "@/db/dbConfig";
import Todo from "@/models/todoModel";
import { ErrorMessage } from "formik";
import { NextRequest, NextResponse } from "next/server";

Connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userId, task } = reqBody;

    const newTodo = new Todo({
      userId,
      task,
    });

    await newTodo.save();

    return NextResponse.json({
      message: "Todo created successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      error: ErrorMessage || "An error occurred while creating todo.",
    }, { status: 500 });
  }
}
