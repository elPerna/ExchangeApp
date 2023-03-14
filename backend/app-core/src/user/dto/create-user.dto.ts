import { SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { User } from "../schemas/user.schema";

export class CreateUserDto {
    @IsString()
    firstName: String;

    @IsString()
    lastName: String;

    @IsString()
    @IsEmail()
    email: String;

    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*|W+))(?![./n])(?=.*[A-Z])(?=.*[a-z]).*$/,{
            message: 'el password debe contener mayusculas, minuscula y numeros'
        }
    )
    password: String;
}

export const UserSchema = SchemaFactory.createForClass(User)