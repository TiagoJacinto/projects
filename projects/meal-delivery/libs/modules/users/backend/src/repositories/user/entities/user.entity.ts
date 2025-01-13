import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

type UserEntityProps = {
  id?: number;
  email: string;
  password: string;
};

@Entity({
  tableName: 'users',
})
export class UserEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  email: string;

  @Property()
  password: string;

  constructor(props: UserEntityProps) {
    if (props.id) this.id = props.id;
    this.email = props.email;
    this.password = props.password;
  }
}
