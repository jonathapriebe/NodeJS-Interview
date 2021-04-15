import { Controller, Delete, Get, Post, Put } from '@overnightjs/core';
import { City } from '@src/models/city';
import { Customer } from '@src/models/customer';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

@Controller('customer')
export class CustomerController {
  @Post('')
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const city = await City.findOne({ _id: req.body.city_id });
      if (!city) {
        return res.status(404).send({ error: 'City not found' });
      }
      const customer = new Customer(req.body);
      const result = await customer.save();
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
      const id = req.query.id;
      const name = req.query.name;

      if (!name && !id) {
        return res.status(422).send({ error: 'Parameter not found' });
      }

      let filter = {};

      filter = name ? { ...filter, name } : filter;
      filter = id ? { ...filter, _id: id } : filter;

      const result = await Customer.findOne(filter);
      if (!result) {
        return res.status(404).send({ error: 'Customer not found.' });
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

  @Put(':id')
  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      if (!req.body.name) {
        return res.status(422).send({ error: 'Name is required' });
      }

      const result = await Customer.findOne({ _id: id });
      if (!result) {
        return res.status(404).send({ error: 'Customer not found.' });
      }
      result.name = req.body.name;
      await result.save();
      return res.status(200).send(result);
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(422).send({ error: error.message });
      } else {
        return res.status(500).send({ error: 'Internal Server Error' });
      }
    }
  }

  @Delete(':id')
  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id;

      const result = await Customer.findOne({ _id: id });
      if (!result) {
        return res.status(404).send({ error: 'Customer not found.' });
      }

      await result.delete();
      return res.status(200).send({ message: 'Customer deleted' });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return res.status(422).send({ error: error.message });
      } else {
        return res.status(500).send({ error: 'Internal Server Error' });
      }
    }
  }
}
