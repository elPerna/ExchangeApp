import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { Wallet, WalletSchema } from './schemas/wallet.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';
import { WalletContract, WalletContractSchema } from './schemas/wallet-contract.schema';
import { UserSchema } from 'src/user/dto/create-user.dto';
import { HashService } from 'src/user/hash.service';
import { AuthService } from 'src/auth/auth.service';
import { BullModule } from '@nestjs/bullmq';
import { default as QueueType } from './queue/types.queue'
import { Transaction, TransactionSchema } from 'src/transaction/schemas/transaction.schema';
@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: Wallet.name, schema: WalletSchema },
      { name: User.name, schema: UserSchema },
      { name: Transaction.name, schema: TransactionSchema },
      { name: WalletContract.name, schema: WalletContractSchema }
    ]),
    BullModule.registerQueue({
      name: QueueType.WITHDRAW_REQUEST
    })
  ],
  controllers: [
    WalletController,
  ],
  providers: [
    WalletService,
    UserService,
    HashService,
    AuthService
  ]
})
export class WalletModule {}
