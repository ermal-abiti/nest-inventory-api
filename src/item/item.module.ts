import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { User, UserSchema } from 'src/auth/schemas/user.schema';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
