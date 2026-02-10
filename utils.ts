import { NextRequest } from "next/server"
import z from "zod"
import appConfig from "./configurations/appConfig"
import InvestmentSubType from "./types/InvestmentSubType"

export function formatNumber(number: number) { return Intl.NumberFormat('en', { notation: 'compact' }).format(number) }

export function getHue(type: InvestmentSubType, s = 40, l = 30) {
  const enumArray = Object.values(InvestmentSubType).filter(v => typeof v === "string")
  const h = (enumArray.indexOf(type) / enumArray.length * 360 + 10) % 360
  return `hsl(${h}, ${s}%, ${l}%)`
  // let hash = 0
  // for (let i = 0; i < str.length; i++) {
  //   hash = str.charCodeAt(i) + ((hash << 6) - hash)
  // }
  // const h = Math.abs(hash) % 360
}

export async function sanitize<T extends z.ZodRawShape>(
  req: NextRequest,
  mode: "query" | "body",
  shape: T
) {
  const schema = z.object(shape)

  let toParse
  if (mode === "body") {
    toParse = await req.json()
  } else {
    const { searchParams } = new URL(req.url)
    toParse = Object.fromEntries(searchParams.entries())
  }

  return schema.parse(toParse) as z.infer<z.ZodObject<T>>
}

export async function sanitizeIds(req: NextRequest) {
  const singleIdSchema = z.string().regex(appConfig.investmentIdRegex, "Investment id bad format.")
  const querySchema = {
    ids: z.preprocess(
      val => {
        if (typeof val !== "string" || val.trim() === "") return undefined
        return val.split(",")
      },
      z.array(singleIdSchema)
        .optional()
    )
  }
  const { ids } = await sanitize(req, "query", querySchema)
  return ids
}

