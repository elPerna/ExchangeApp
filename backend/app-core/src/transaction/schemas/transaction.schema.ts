import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
    @Prop({
        required: true,
        index: true
    })
    nature: number;

    @Prop({
        required: false,
        index: true
    })
    txHash: string;

    @Prop()
    amount: number;

    to: string;

    @Prop({
        required: false,
        index: true,
        default: 1
    })
    status: number; //1 aprovado, 2 procesando, 3 procesado, 4 cancelado
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
