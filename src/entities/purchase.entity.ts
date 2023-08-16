import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Book } from "./book.entity";

/**
 * Entity representing a Purchase in the database.
 */
@Entity()
export class Purchase {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => Book, { eager: true }) 
    @JoinColumn()
    book?: Book;

    @Column({ type: "int" }) 
    userId?: number;

    @Column({ type: "int" }) 
    quantity?: number;

    @Column({ type: "decimal", precision: 10, scale: 2 }) 
    totalPrice?: number;
}
