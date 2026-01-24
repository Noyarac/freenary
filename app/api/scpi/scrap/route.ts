import { NextResponse } from "next/server"
import z from "zod"
import { getRepository } from "@/configurations/ormConfig"
import Scpi from "@/entities/Scpi"

const idSchema = z.coerce.number().int().positive()


export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const id = idSchema.parse(searchParams.get("id"))
        const scpi = await (await getRepository(Scpi)).findOneBy({ id })
        if (!scpi) throw new Error()
        const answer = scpi.getService().findDetails()
        return NextResponse.json(answer)
    } catch (error) {
        switch (error) {
            case error instanceof z.ZodError:
                return NextResponse.json(
                    { error: "Invalid ID format" },
                    { status: 400 }
                )
            default:
                return NextResponse.json(
                    { error: "Something went wrong."},
                    { status: 500 }
                )
        }
    }
}

