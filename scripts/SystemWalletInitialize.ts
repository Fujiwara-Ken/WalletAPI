//////////////////////////////////////////////
// $ npx ts-node scripts/createWallet.ts
//////////////////////////////////////////////
import { Account } from '@solana-suite/core';

// Walletの公開鍵と秘密鍵を生成
const createWallet = async () => {
  const account = await Account.create();

  console.log('# pubkey: ', account.pubkey);
  console.log('# secret: ', account.secret);

  return account;
};

createWallet()
  .then((res) => {
    console.log('以下を環境変数に設定');
    console.log(`SYSTEM_WALLET_ADDRESS: ${res.pubkey}`);
    console.log('開発環境の場合は以下も設定');
    console.log(`DEVELOP_SYSTEM_WALLET_SECRET: ${res.secret}`);
  })
  .catch((er) => {
    console.error(er);
    process.exit(-1);
  })
  .finally(async () => {
    process.exit();
  });
