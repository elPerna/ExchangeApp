import { IsEmail,  IsString } from "class-validator";


export class LoginUserDto {
    @IsString()
    @IsEmail()
    email: String;

    @IsString()
    password: String;

}