import InvestmentService, { InvestmentResultMap } from "@/services/InvestmentService"
import { sanitize, sanitizeId } from "@/utils"
import { NextRequest, NextResponse } from "next/server"
import z from "zod"

export async function GET(req: NextRequest) {
    const id = await sanitizeId(req)
    const { mode } = await sanitize(req, "query", { mode: z.string().refine(v => ["basic", "details"].includes(v)) })
    const responseObject = await InvestmentService.getInvestments(mode as keyof InvestmentResultMap, id)
    return NextResponse.json(responseObject)
}