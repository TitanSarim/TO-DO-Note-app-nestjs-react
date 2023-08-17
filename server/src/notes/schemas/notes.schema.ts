/* eslint-disable prettier/prettier */
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';


export enum Category {
    MEETING = 'Meeting',
    URGENT = 'Urgent',
    PERSONAL = 'Personal',
    WORK = 'Work'
}



@Schema({ timestamps: true })
export class Note{

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  category: Category;

}


export const NoteSchema = SchemaFactory.createForClass(Note)


