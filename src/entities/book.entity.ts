import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * Entity representing a Book in the database.
 */
@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: "varchar", length: 255 }) 
    title?: string;

    @Column({ nullable: true })
    description?: string;

    @Column({ type: "float", default: 0 })
    discountRate?: number;

    @Column({ nullable: true })
    coverImage?: string;

    @Column({ type: "decimal", precision: 10, scale: 2 }) 
    price?: number;

    @Column({ type: "int", default: 0 })
    stock?: number; 
}
