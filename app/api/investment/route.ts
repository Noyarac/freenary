import InvestmentService from "@/services/InvestmentService"
import InvestmentSubType from "@/types/InvestmentSubType"
import { sanitize, sanitizeIds, singleIdSchema } from "@/utils"
import { NextRequest, NextResponse } from "next/server"
import z from "zod"

export async function GET(req: NextRequest) {
    const ids = await sanitizeIds(req)
    const { detailed } = await sanitize(req, "query", { detailed: z.coerce.boolean().optional() })
    const responseObject = await InvestmentService.getInvestments({ ids, detailed })
    return NextResponse.json(responseObject)
}

export async function POST(req: NextRequest) {
    let sanitized
    try {
        sanitized = await sanitize(req, "form", {
            id: singleIdSchema,
            type: z.enum(Object.values(InvestmentSubType))
        })

    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
    let responseObject
    let status
    const { id, type } = sanitized
    try {
        responseObject = await InvestmentService.saveInvestment(id, type)
        status = { status: 200 }
    } catch (error) {
        responseObject = { error }
        status = { status: 500 }
    }
    return NextResponse.json(responseObject, status)
}

export async function DELETE(req: NextRequest) {
    let ids
    try {
        ids = await sanitizeIds(req, "body")
        if (ids === undefined) throw new Error()
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
    try {
        await InvestmentService.deleteInvestments(ids)
    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
    return NextResponse.json({success: true})
}
