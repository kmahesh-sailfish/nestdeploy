import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Notese } from './notes';

@Entity('users')
export class Users {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  email: string;
  @Column()
  passwords: string;
  @Column()
  lastName: string;
  @Column()
  userName: string;
  @OneToMany(type => Notese, notes => notes.users)
  notes: Notese[]
}
