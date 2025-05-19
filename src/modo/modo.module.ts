import { Module } from '@nestjs/common';
import { ModoController } from './modo.controller';
import { ModoService } from './modo.service';

@Module({
  imports: [],
  controllers: [ModoController],
  providers: [ModoService],
})
export class ModoModule {}
