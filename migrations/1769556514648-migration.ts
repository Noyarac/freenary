import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1769556514648 implements MigrationInterface {
    name = 'Migration1769556514648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "investment" ("id" varchar PRIMARY KEY NOT NULL, "type" varchar CHECK( "type" IN ('Scpi','Stock') ) NOT NULL)`);
        await queryRunner.query(`CREATE INDEX "IDX_94b4fc965122aff2fece6ddd17" ON "investment" ("type") `);
        await queryRunner.query(`CREATE TABLE "movement" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, "investmentId" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_movement" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, "investmentId" varchar NOT NULL, CONSTRAINT "FK_830354962110377fe0a9c4ff562" FOREIGN KEY ("investmentId") REFERENCES "investment" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_movement"("id", "date", "quantity", "price", "investmentId") SELECT "id", "date", "quantity", "price", "investmentId" FROM "movement"`);
        await queryRunner.query(`DROP TABLE "movement"`);
        await queryRunner.query(`ALTER TABLE "temporary_movement" RENAME TO "movement"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movement" RENAME TO "temporary_movement"`);
        await queryRunner.query(`CREATE TABLE "movement" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, "investmentId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "movement"("id", "date", "quantity", "price", "investmentId") SELECT "id", "date", "quantity", "price", "investmentId" FROM "temporary_movement"`);
        await queryRunner.query(`DROP TABLE "temporary_movement"`);
        await queryRunner.query(`DROP TABLE "movement"`);
        await queryRunner.query(`DROP INDEX "IDX_94b4fc965122aff2fece6ddd17"`);
        await queryRunner.query(`DROP TABLE "investment"`);
    }

}
