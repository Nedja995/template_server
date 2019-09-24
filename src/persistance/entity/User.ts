import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column('text', {nullable: true})
  public username: string;

  @Column('text', {nullable: true})
  public firstname: string;

  @Column('text', {nullable: true})
  public lastname: string;

  @Column()
  public password: string;

  @Column('text')
  public email: string;

  @Column('text', {nullable: true})
  public phone: string;

  @Column({default: 0})
  public userStatus: number;

  @Column({default: 'USER'})
  public role: string;

  @Column()
  @UpdateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;

  public hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
