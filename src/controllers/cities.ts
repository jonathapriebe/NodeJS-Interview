import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('cities')
export class CitiesController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    res.status(201).send(req.body);
  }
}
