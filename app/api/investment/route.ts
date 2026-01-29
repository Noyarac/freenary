import InvestmentService from "@/services/InvestmentService"
import { sanitize, sanitizeIds } from "@/utils"
import { NextRequest, NextResponse } from "next/server"
import z from "zod"

export async function GET(req: NextRequest) {
    const ids = await sanitizeIds(req)
    const { detailed } = await sanitize(req, "query", { detailed: z.coerce.boolean().optional() })
    const responseObject = await InvestmentService.getInvestments({ ids, detailed})
    return NextResponse.json(responseObject)
}