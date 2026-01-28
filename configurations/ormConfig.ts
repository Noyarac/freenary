import "reflect-metadata"
import * as dotenv from "dotenv"
dotenv.config()
import { DataSource, ObjectLiteral, Repository } from "typeorm"
import appConfig from "@/configurations/appConfig"
import Investment from "@/entities/Investment"
import Scpi from "@/entities/Scpi"
import Stock from "@/entities/Stock"
import Movement from "@/entities/Movement"

const isTypeORMCLI = !!process.env.TYPEORM_CLI || process.argv.some(arg => arg.includes("typeorm"))

const options: any = {
    type: "sqlite",
    database: appConfig.DB_PATH,
    synchronize: false,
    entities: [Investment, Movement, Scpi, Stock],
}
if (isTypeORMCLI) {
    options.migrations = ["migrations/**/*{.js,.ts}"]
}
const AppDataSource = new DataSource(options)

export default AppDataSource

export async function getRepository<T extends ObjectLiteral>(entity: { new (): T }): Promise<Repository<T>> {
    if (!AppDataSource.isInitialized) await AppDataSource.initialize()
    return AppDataSource.getRepository<T>(entity)
}

