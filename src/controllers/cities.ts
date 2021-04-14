import { Controller, Post } from '@overnightjs/core';
import { City } from '@src/models/city';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

@Controller('cities')
export class CitiesController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const city = new City(req.body);
      const result = await city.save();
      res.status(201).send(result);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(422).send({ error: error.message });
      } else {
        res.status(500).send({ error: 'Internal Server Error' });
      }
    }
  }
}
