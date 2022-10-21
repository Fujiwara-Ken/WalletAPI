import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment', { name: 'user_id' })
  userId: number;

  @Column({ name: 'email' })
  email: string;

  @Column()
  password: string;

  @Column()
  wallet_address: string;

  @Column({ nullable: true, name: 'refreshtoken' })
  refresh_token: string;

  @Column({ type: 'date', nullable: true, name: 'refreshtokenexp' })
  refresh_token_exp: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt!: Date;
}
