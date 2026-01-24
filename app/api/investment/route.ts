import { getJsonForAll } from "@/services/InvestmentService"
import { InvestmentDTO } from "@/types/InvestmentDTO"
import { NextResponse } from "next/server"

export async function GET() {
    const responseObject: InvestmentDTO[] = await getJsonForAll()
    return NextResponse.json(responseObject)
}