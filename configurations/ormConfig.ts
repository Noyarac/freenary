import * as dotenv from "dotenv"
dotenv.config()
import { DataSource } from "typeorm"
import { appConfig } from "./appConfig"
import Investment from "../entities/Investment"
import Event from "../entities/Event"
import Scpi from "@/entities/Scpi"
import Stock from "@/entities/Stock"

const isTypeORMCLI = !!process.env.TYPEORM_CLI || process.argv.some(arg => arg.includes("typeorm"))

const options: any = {
    type: "sqlite",
    database: appConfig.DB_PATH,
    synchronize: false,
    entities: [Investment, Event, Scpi, Stock],
}
if (isTypeORMCLI) {
    options.migrations = ["migrations/**/*{.js,.ts}"]
}
const AppDataSource = new DataSource(options)

export default AppDataSource

export async function getRepository<T>(entity: { new (): T}) {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize()
    return AppDataSource.getRepository(entity)
}

