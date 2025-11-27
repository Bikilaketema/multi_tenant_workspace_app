import { Module } from '@nestjs/common';
import { OutlineService } from './outline.service';
import { OutlineController } from './outline.controller';

@Module({
  controllers: [OutlineController],
  providers: [OutlineService],
})
export class OutlineModule {}
