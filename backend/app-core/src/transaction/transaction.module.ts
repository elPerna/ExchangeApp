import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { UserModule } from 'src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { UserSchema } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/schemas/user.schema';
import { Wallet, WalletSchema } from 'src/wallet/schemas/wallet.schema';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { HashService } from 'src/user/hash.service';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: User.name, schema: UserSchema },
      { name: Wallet.name, schema: WalletSchema },
    ])
  ],
  controllers: [TransactionController],
  providers: [
    TransactionService,
    AuthService,
    UserService,
    HashService
  ]
})
export class TransactionModule {}
