import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
// @Unique(["name"])
export class FoodArticle {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public name: string;

  @Column()
  public shortDescription: string;

  @Column("text", { nullable: true})
  public images: string;

  @Column()
  public description: string;

  @Column()
  public price: number;

  @Column({nullable: true})
  @CreateDateColumn()
  public createdAt: Date;

  @Column({nullable: true})
  @UpdateDateColumn()
  public updatedAt: Date;
}