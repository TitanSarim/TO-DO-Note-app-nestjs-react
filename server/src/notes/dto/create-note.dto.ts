/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { Category } from '../schemas/notes.schema';

export class CreateNoteDto {

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsNotEmpty()
  @IsEnum(Category, {message: 'Please enter correct category'})
  readonly category: Category;



}
