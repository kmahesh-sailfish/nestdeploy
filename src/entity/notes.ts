import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Users } from './users';


@Entity('notes')
export class Notese {
    @PrimaryGeneratedColumn()
    notesId:number;

    @Column()
    title:string;

    @Column()
    description:string;
    
    @ManyToOne(type =>Users, users=>users.notes )
    users:Users
}
