import Scpi from "@/entities/Scpi";
import Stock from "@/entities/Stock";
import { MigrationInterface, QueryRunner } from "typeorm";

export class MockData1769092295958 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const scpiRepository = queryRunner.manager.getRepository(Scpi)
        const stockRepository = queryRunner.manager.getRepository(Stock)

        // Insert test data for SCPI
        const scpi1 = new Scpi()
        scpi1.name = 'Eurion'
        scpi1.organism = "Corum"
        scpi1.frequency = 1
        scpi1.delay = 6
        await scpiRepository.save(scpi1)

        const scpi2 = new Scpi()
        scpi2.name = 'PFO2'
        scpi2.organism = "Perial"
        scpi2.frequency = 3
        scpi2.delay = 6
        await scpiRepository.save(scpi2)

        // Insert test data for Stock
        const stock1 = new Stock()
        stock1.name = 'Air Liquide'
        stock1.frequency = 12
        await stockRepository.save(stock1)

        const stock2 = new Stock()
        stock2.name = 'MSCI World'
        await stockRepository.save(stock2)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Optionally, you can write code to revert the changes made by the migration
    }
}
