import { Migration } from '@mikro-orm/migrations';

export class Migration20250111130830 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "users" ("id" serial primary key, "email" varchar(255) not null, "password" varchar(255) not null);`);
  }

}
