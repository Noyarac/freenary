import Investment from "@/entities/Investment"
import Movement from "@/entities/Movement"
import MovementService from "@/services/MovementService"
import { sanitize, singleIdSchema } from "@/utils"
import { NextRequest, NextResponse } from "next/server"
import z from "zod"

export async function POST(req: NextRequest) {
    let sanitized
    try {
        sanitized = await sanitize(req, "form", {
            investmentId: singleIdSchema,
            date: z.preprocess(val => new Date(val as string), z.date()),
            quantity: z.preprocess(val => Number(val), z.number()),
            price: z.preprocess(val => Number(val), z.number())
        })

    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
    let responseObject
    let status
    try {
        const movement = new Movement()
        movement.date = new Date(sanitized.date)
        movement.price = sanitized.price
        movement.quantity = sanitized.quantity
        movement.investment = { id: sanitized.investmentId } as Investment
        responseObject = await MovementService.saveMovement(movement)
        responseObject = { ...responseObject, investmentId: responseObject.investment.id, investment: undefined}
        status = { status: 200 }
    } catch (error) {
        responseObject = { error }
        status = { status: 500 }
    }
    return NextResponse.json(responseObject, status)
}

export async function DELETE(req: NextRequest) {
    let sanitized
    try {
        sanitized = await sanitize(req, "body", {id: z.int().positive()})
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
    try {
        await MovementService.deleteMovement(sanitized.id)
    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
    return NextResponse.json({success: true})
}
