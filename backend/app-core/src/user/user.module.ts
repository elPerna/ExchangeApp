import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HashService } from './hash.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema,
    }])
  ],
  controllers: [UserController],
  providers: [
    UserService,
    HashService
  ]
})
export class UserModule {}
