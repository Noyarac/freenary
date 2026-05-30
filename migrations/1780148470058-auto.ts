import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1780148470058 implements MigrationInterface {
    name = 'Auto1780148470058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Investment" ("id" varchar PRIMARY KEY NOT NULL, "enableDividend" boolean NOT NULL, "type" varchar CHECK( "type" IN ('Scpi','Stock','Livret') ) NOT NULL)`);
        await queryRunner.query(`CREATE INDEX "IDX_7eba0a127fddcf8897569ce870" ON "Investment" ("type") `);
        await queryRunner.query(`CREATE TABLE "Movement" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, "investmentId" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_Movement" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, "investmentId" varchar NOT NULL, CONSTRAINT "FK_b0fb83dc6a1be6e15201427263e" FOREIGN KEY ("investmentId") REFERENCES "Investment" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_Movement"("id", "date", "quantity", "price", "investmentId") SELECT "id", "date", "quantity", "price", "investmentId" FROM "Movement"`);
        await queryRunner.query(`DROP TABLE "Movement"`);
        await queryRunner.query(`ALTER TABLE "temporary_Movement" RENAME TO "Movement"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Movement" RENAME TO "temporary_Movement"`);
        await queryRunner.query(`CREATE TABLE "Movement" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" datetime NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, "investmentId" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "Movement"("id", "date", "quantity", "price", "investmentId") SELECT "id", "date", "quantity", "price", "investmentId" FROM "temporary_Movement"`);
        await queryRunner.query(`DROP TABLE "temporary_Movement"`);
        await queryRunner.query(`DROP TABLE "Movement"`);
        await queryRunner.query(`DROP INDEX "IDX_7eba0a127fddcf8897569ce870"`);
        await queryRunner.query(`DROP TABLE "Investment"`);
    }

}
