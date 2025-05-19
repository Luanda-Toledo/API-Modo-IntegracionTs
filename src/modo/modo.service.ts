import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import {
  baseUrl,
  clientId,
  clientSecret,
  storeId,
  userAgent,
} from '../../config/modoConfig';

@Injectable() //Etiqueta de nest para indicar que esta clase puede ser utilizada en otros lugares
export class ModoService {
  private modoInstance: AxiosInstance;

  constructor() {
    this.modoInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
      },
    });
  }

  async crearToken(): Promise<string> {
    try {
      const response = await this.modoInstance.post('/middleman/token', {
        username: clientId,
        password: clientSecret,
      });
      return response.data.accessToken;
    } catch (error: any) {
      console.error(error.response?.data);
      throw new HttpException(
        'Error creando el token: ' + (error.response?.data?.message || error.message),
        HttpStatus.INTERNAL_SERVER_ERROR, //500
      );
    }
  }

  async crearIntencionPago(data: any): Promise<any> {
    try {
      const token = await this.crearToken();
      const response = await this.modoInstance.post(
        '/ecommerce/payment-intention',
        {
          ...data,
          storeId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      throw new HttpException(
        'Error creando intención de pago: ' + (error.response?.data?.message || error.message),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async obtenerInfoPago(paymentId: string): Promise<any> {
    try {
      const token = await this.crearToken();
      const response = await this.modoInstance.get(
        `/ecommerce/payment-intention/${paymentId}/data`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      throw new HttpException(
        'Error obteniendo información del pago: ' + (error.response?.data?.message || error.message),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async realizarDevolucion(paymentId: string, data: any): Promise<any> {
    try {
      const token = await this.crearToken();
      const response = await this.modoInstance.post(
        `/ecommerce/payment-intention/${paymentId}/refund`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      throw new HttpException(
        'Error realizando la devolución: ' + (error.response?.data?.message || error.message),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

