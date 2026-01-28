import InvestmentService from "@/services/InvestmentService"
import InvestmentDTO from "@/types/InvestmentDTO"
import { NextResponse } from "next/server"

const service = InvestmentService

export async function GET() {
    const responseObject: InvestmentDTO[] = await service.getJsonForAll()
    return NextResponse.json(responseObject)
}