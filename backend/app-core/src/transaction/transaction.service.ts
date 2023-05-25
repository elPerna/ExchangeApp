import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { Wallet, WalletDocument } from 'src/wallet/schemas/wallet.schema';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>
  ) { }

  async getTransaction(queryDto: QueryDto){
    const data = this.transactionModel.findOne(
      { _id: new Types.ObjectId(queryDto.transactionId) },
      { _id: 0, __v: 0 }
      ).exec()

      if(data) {
        return data;
      }
  }

  async getTransactions(email: string, queryDto: QueryDto){
    const data = await this.userModel.aggregate([
      { $match: { email } },
      { $unwind: "$wallets" },
      { $project: { _id: 0 } },
      {
        $lookup: {
          from: "wallets",
          localField: "wallets",
          foreignField: "_id",
          as: "walletsData",
          pipeline: [
            {
              $match: { coin: queryDto.coin }
            }
          ]
        }
      }
    ]).exec();

    if(data && data.length > 0){
      let wallet = data.find(w => w.walletsData.length > 0);
      if(wallet){
        wallet = wallet.walletsData[0];
        const data = await this.userModel.aggregate([
          { $match: { _id: new Types.ObjectId(wallet.id) } },
          { $unwind: '$transactions' },
          { $project: { _id: 0, transactions: 1 } },
          {
            $lookup: {
              from: "transactions",
              localField: "transactions",
              foreignField: "_id",
              as: "transactionData",
            }
          }
        ]).exec();

        if(data && data.length > 0){
          return data.map(transaction => {
            return {
              nature: transaction.transactionData[0].nature,
              txHash: transaction.transactionData[0].txHash,
              transactionId: transaction.transactionData[0]._id,
              create_at: transaction.transactionData[0].create_at,
              confirmations: transaction.transactionData[0].confirmations,
              status: transaction.transactionData[0].status,
              amount: transaction.transactionData[0].amount
            }
          })
        }
      }
    }
  }

}
