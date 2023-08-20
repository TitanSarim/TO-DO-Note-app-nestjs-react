import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from './schemas/notes.schema';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name)
    private noteModel: mongoose.Model<Note>,
  ) {}

  //  Create new Note => Post /Note
  async create(note: Note): Promise<any> {
    const data = Object.assign(note);

    const res = await this.noteModel.create(data);

    return res;
  }

  // Get All Notes = Get /notes
  async findAll(query: Query): Promise<Note[]> {
    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const allNotes = await this.noteModel.find({ ...keyword });
    return allNotes;
  }

  // Get Note by ID = Get /note/:id
  async findById(id: string): Promise<Note> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Wrong Id error');
    }

    const note = await this.noteModel.findById(id);

    if (!note) {
      throw new NotFoundException('Note Not found with this ID');
    }

    return note;
  }

  // Put Note by ID = PUT /note/:id
  async updateById(id: string, note: Note): Promise<Note> {
    return await this.noteModel.findByIdAndUpdate(id, note, {
      new: true,
      runValidators: true,
    });
  }

  // Delete Note by ID = Delete /note/:id
  async deleteNote(id: string): Promise<{ deleted: boolean }> {
    const res = await this.noteModel.findByIdAndDelete(id);
    if (res) return { deleted: true };
    return { deleted: false };
  }
}
