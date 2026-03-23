import InvestmentService from "@/services/InvestmentService"
import InvestmentSubType, { InvestmentSubTypeName } from "@/types/InvestmentSubType"
import { sanitize, sanitizeIds, singleIdSchema } from "@/utils"
import { NextRequest, NextResponse } from "next/server"
import z from "zod"

export async function GET(req: NextRequest) {
    const ids = await sanitizeIds(req)
    const { detailed } = await sanitize(req, "query", { detailed: z.coerce.boolean().optional() })
    const responseObject = await InvestmentService.getInvestments({ ids, detailed})
    return NextResponse.json(responseObject)
}

export async function POST(req: NextRequest) {
    let id = ""
    let type: InvestmentSubTypeName = "Livret"
    try {
        const { id, type } = await sanitize(req, "form", {
            id: singleIdSchema,
            type: z.enum(Object.values(InvestmentSubType))
        })

    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
    let responseObject
    let status
    try {
        responseObject = await InvestmentService.saveInvestment(id, type)
        status = { status: 200 }
    } catch (error) {
        responseObject = { error }
        status = { status: 500 }
    }
    return NextResponse.json(responseObject, status)
}