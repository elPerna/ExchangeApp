import { Injectable } from "@nestjs/common/decorators";
import { HashService } from "src/user/hash.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private hashService: HashService
    ){ }

    async validateUser(email: string, password: string): Promise<any>{
        const user = await this.userService.getUserByEmail(email);
        if(user){
            const math = await this.hashService.comparePassword(password, user.password);
            if(math)
            return user;
        }

        return null;
    }
}