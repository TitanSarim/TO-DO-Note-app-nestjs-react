import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesService } from './notes.service';
import { Note } from './schemas/notes.schema';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('/api/v1/notes')
export class NotesController {
  constructor(private noteService: NotesService) {}

  @Post()
  async create(@Body() note: CreateNoteDto): Promise<Note> {
    return this.noteService.create(note);
  }

  @Get()
  async getAllNotes(@Query() query: ExpressQuery): Promise<Note[]> {
    return this.noteService.findAll(query);
  }

  @Get(':id')
  async getNote(@Param('id') id: string): Promise<Note> {
    return this.noteService.findById(id);
  }

  @Put(':id')
  async updateNote(
    @Body() updateNoteDto: UpdateNoteDto,
    @Param('id') id: string,
  ): Promise<Note> {
    const note = await this.noteService.findById(id);
    return this.noteService.updateById(id, updateNoteDto);
  }

  @Delete(':id')
  async deleteNote(@Param('id') id: string): Promise<{ deleted: boolean }> {
    const note = await this.noteService.findById(id);
    return this.noteService.deleteNote(id);
  }
}
