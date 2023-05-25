const nodemailer = require('nodemailer')

let mailTransaporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'prokso@gmail.com',
        pass: 'eceulkwkgkecerud'
    }
})

const sendDepositEmail = async (amount, coin, toEmail) =>{
    const mailDetails = {
        from: 'Exchange Wallet App <email>',
        to: toEmail,
        subject: `[EWApp] Deposits Confirmation`,
        hrml: `
                <h3><strong>Deposit Completed!</strong></h3>
                <p>Your Deposit ${amount} ${coin.toUpperCase()} is completed on your wallet
                <a style="text-decoration: none;" href="http://localhost:5000/wallet/${coin.toLowerCase()}"
                target="_blank" rel="noopener">Check you balance here!</a></p>`
    }

    return await mailTransaporter.sendMail(mailDetails)
}

const sendWithdrawEmail = async (amount, coin, toAddress, txId, toEmail) =>{
    const mailDetails = {
        from: 'Exchange Wallet App <email>',
        to: toEmail,
        subject: `[EWApp] Withdraws Confirmation`,
        hrml: `
                <h3><strong>Withdraw Completed!</strong></h3>
                <div>
                    You realized a withdraw ${amount} ${coin.toUpperCase()} in your EWApp account
                </div>
                <div>&nbsp;</div>
                <div>
                    <strong>Withdraw Address</strong> ${toAddress}
                </div>
                <div>
                    <strong>Transaction Id</strong> ${txId}
                </div>
                `
    }

    return await mailTransaporter.sendMail(mailDetails)
}

module.exports = {
    sendDepositEmail,
    sendWithdrawEmail
}