import { getRepo } from "@/configurations/ormConfig";
import Investment from "@/entities/Investment";
import { NextResponse } from "next/server";

export async function GET() {
    const repo = await getRepo(Investment)
    return NextResponse.json(await repo.find({ relations: ["events"]}))
}