import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg'; 
import { PrismaPg } from '@prisma/adapter-pg'; 

@Global()
@Module({
  imports: [ConfigModule], 
  providers: [
    {
      provide: PrismaService,
      useFactory: (configService: ConfigService) => {
        
        const dbUrl = configService.get('DB_URL');
        if (!dbUrl) {
            throw new Error("DB_URL is missing. Check .env and ConfigService.");
        }
        
        const pool = new Pool({ connectionString: dbUrl });

        const adapter = new PrismaPg(pool); 
        
        const prismaClient = new PrismaClient({
            adapter: adapter, 
        });
        
        const prismaService = new PrismaService();
        prismaService.client = prismaClient; 
        
        return prismaService;
      },
      inject: [ConfigService],
    },
  ],
  exports: [PrismaService], 
})
export class PrismaModule {}