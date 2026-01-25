import Movement from "@/entities/Movement";
import Scpi from "@/entities/Scpi";
import Stock from "@/entities/Stock";
import { MigrationInterface, QueryRunner } from "typeorm";

export class Mock1869206215541 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const scpiRepository = queryRunner.manager.getRepository(Scpi)
        const stockRepository = queryRunner.manager.getRepository(Stock)

        // Insert test data for SCPI
        const scpi1 = new Scpi()
        scpi1.name = 'Eurion'
        scpi1.organism = "Corum"
        scpi1.frequency = 1
        scpi1.delay = 6
        scpi1.scpiLabId = 41
        scpi1.movements = [
            {
                date: new Date(2022, 7, 15),
                price: 30000,
                quantity: 139.535
            }
        ].map(data => {
                const movement = new Movement()
                Object.assign(movement, data)
                return movement
            })
        await scpiRepository.save(scpi1)


        const scpi2 = new Scpi()
        scpi2.name = 'Optimale'
        scpi2.organism = "Consultim"
        scpi2.frequency = 3
        scpi2.delay = 6
        scpi2.scpiLabId = 78
        scpi2.movements = [
            {
                date: new Date(2024, 5, 23),
                price: 15000,
                quantity: 60
            },
            {
                date: new Date(2024, 10, 25),
                price: 87,
                quantity: 0.348
            },
        ].map(data => {
                const movement = new Movement()
                Object.assign(movement, data)
                return movement
            })
        await scpiRepository.save(scpi2)

        const stock1 = new Stock()
        stock1.name = 'iShare MSCI World'
        stock1.frequency = 0
        stock1.ticker = "WPEA.PA"
        stock1.movements = [
            {
                date: new Date(2024, 5, 23),
                price: 100000,
                quantity: ~~(23844 * 2 / 3)
            },
            {
                date: new Date(2024, 10, 25),
                price: 50000,
                quantity: ~~(23844 * 1 / 3)
            },
        ].map(data => {
                const movement = new Movement()
                Object.assign(movement, data)
                return movement
            })
        await stockRepository.save(stock1)    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
