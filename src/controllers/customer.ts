import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('customer')
export class CustomerController {
  @Get('')
  public getCustomer(req: Request, res: Response): void {
    res.status(200).send({
      name: 'João',
      gender: 'Masculino',
      age: 15,
      dtBirthday: '1988-04-05',
      idCity: '123',
    });
  }
}
