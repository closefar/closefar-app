import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlockDocument = HydratedDocument<Block>;

@Schema({ timestamps: true })
export class Block {
  @Prop({ required: true, type: 'number' })
  currentBlockHeight: number;
}

export const BlockSchema = SchemaFactory.createForClass(Block);
