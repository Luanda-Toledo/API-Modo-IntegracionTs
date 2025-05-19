import { Module } from '@nestjs/common';
import { ModoModule } from './modo/modo.module'; 

@Module({
  imports: [ModoModule], 
})
export class AppModule {}
