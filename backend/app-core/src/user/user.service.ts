import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { BadRequestException } from '@nestjs/common/exceptions';
import { HashService } from './hash.service';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private hashSrevice: HashService
  ) { }

    async getUserByEmail(email: string){
      return this.userModel.findOne({ email }).exec();
    }

    async register(createUserDto: CreateUserDto) {
      const createUser = new this.userModel(createUserDto);
      const user = await this.getUserByEmail(createUserDto.email);
      if(user){
        throw new BadRequestException();
      }

      createUser.password = await this.hashSrevice.hashPassword(createUser.password)
      return createUser.save();

    }

}
