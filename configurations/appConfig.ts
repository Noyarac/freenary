import z from "zod"

const configSchema = z.object({
    DB_PATH: z.string().min(1).default("freenary.sqlite"),
})

const parsed = configSchema.safeParse(process.env)
if (!parsed.success) {
    console.error(`Environment variables error: ${parsed.error}`)
    process.exit(1)
}

const hardCoded = {
    investmentIdRegex: /^(\d{1,4})|([A-Z]+\.[A-Z]+)$/
}

const appConfig: z.infer<typeof configSchema> & typeof hardCoded = {
    ...hardCoded,
    ...(parsed.success ? parsed.data : {} as any)
}

export default appConfig