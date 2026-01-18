import z from "zod"

const configSchema = z.object({
    DB_PATH: z.string().min(1).default("freenary.sqlite")
})

const parsed = configSchema.safeParse(process.env)
if (!parsed.success) {
    console.error(`Environment variables error: ${parsed.error}`)
    process.exit(1)
}

export const appConfig: { [K in keyof typeof configSchema.def.shape]: string } = {} as any;
for (const key of Object.keys(configSchema.def.shape) as Array<keyof typeof configSchema.def.shape>) {
    appConfig[key] = parsed.data ? parsed.data[key] : ""
}