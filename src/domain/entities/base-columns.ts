import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseColumns {
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  class?: string;
}
