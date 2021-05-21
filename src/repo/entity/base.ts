import { BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class DatedEntity extends BaseEntity {

    @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    /**
     *
     */
    constructor() {
        super();
    }
}