import { getRepository } from "@/configurations/ormConfig"
import Investment from "@/entities/Investment"
import { NextResponse } from "next/server"

export async function GET() {
    const investmentRepository = await getRepository(Investment)
    const investments = await investmentRepository.find({ relations: ["events"]})
    const responseObject = investments.map(investment => Object.assign({ type: investment.constructor.name }, investment))
    return NextResponse.json(responseObject)
}