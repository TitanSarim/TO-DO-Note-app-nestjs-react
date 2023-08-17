/* eslint-disable prettier/prettier */
import { IsOptional, IsString, IsEnum } from 'class-validator';
import { Category } from '../schemas/notes.schema';

export class UpdateNoteDto {

  
  @IsOptional() 
  @IsString()
  readonly title: string;

  @IsOptional() 
  @IsString()
  readonly content: string;

  @IsOptional() 
  @IsEnum(Category, {message: 'Please enter correct category'})
  readonly category: Category;



}
