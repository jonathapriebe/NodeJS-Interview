import { Controller, Get, Post } from '@overnightjs/core';
import { City } from '@src/models/city';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

@Controller('cities')
export class CitiesController {
  @Post('')
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const city = new City(req.body);
      const result = await city.save();
      return res.status(201).send(result);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(422).send({ error: error.message });
      } else {
        return res.status(500).send({ error: 'Internal Server Error' });
      }
    }
  }

  @Get('')
  public async get(req: Request, res: Response): Promise<Response> {
    try {
      const name = req.query.name;
      const state = req.query.state;

      if (!name && !state) {
        return res.status(422).send({ error: 'Parameter not found' });
      }

      let filter = {};

      filter = name ? {...filter, name} : filter;
      filter = state ? {...filter, state} : filter;

      const result = await City.findOne(filter);
      if (!result) {
        return res.status(404).send({ error: 'City not found.' });
      }
      return res.status(200).send(result);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(422).send({ error: error.message });
      } else {
        return res.status(500).send({ error: 'Internal Server Error' });
      }
    }
  }
}
