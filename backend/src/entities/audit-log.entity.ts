import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('audit_logs')
export class AuditLog {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'user_id', nullable: true })
    userId!: number;

    @Column({ type: 'varchar', length: 100 })
    action!: string;

    @Column({ type: 'varchar', length: 50, nullable: true, name: 'entity_type' })
    entityType!: string;

    @Column({ type: 'integer', nullable: true, name: 'entity_id' })
    entityId!: number;

    @Column({ type: 'jsonb', nullable: true })
    details!: any;

    @Column({ type: 'varchar', length: 45, nullable: true, name: 'ip_address' })
    ipAddress!: string;

    @Column({ type: 'text', nullable: true, name: 'user_agent' })
    userAgent!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user!: User;
}
