import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ModoService } from './modo.service';

@Controller('modo') //todas las rutas definidas en esta clase estarán bajo el prefijo /modo
export class ModoController {
  constructor(private readonly modoService: ModoService) {}

  @Get('token')
  async crearToken() {
    try {
      const token = await this.modoService.crearToken();
      return { token };
    } catch (error: any) {
      throw new HttpException(
        { error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR, //500
      );
    }
  }

  @Post('pago')
  async crearIntencionPago(@Body() datosPago: any) {
    try {
      const resultado = await this.modoService.crearIntencionPago(datosPago);
      return resultado;
    } catch (error: any) {
      throw new HttpException(
        { error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('pago/:paymentId')
  async obtenerInfoPago(@Param('paymentId') paymentId: string) {
    try {
      const resultado = await this.modoService.obtenerInfoPago(paymentId);
      return resultado;
    } catch (error: any) {
      throw new HttpException(
        { error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('pago/:paymentId/devolucion')
  async realizarDevolucion( @Param('paymentId') paymentId: string, @Body() datosDevolucion: any,) {
    try {
      const resultado = await this.modoService.realizarDevolucion(
        paymentId,
        datosDevolucion,
      );
      return resultado;
    } catch (error: any) {
      throw new HttpException(
        { error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
