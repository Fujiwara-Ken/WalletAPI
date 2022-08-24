//////////////////////////////////////////////
// $ npx ts-node src/scripts/airdrop.ts
//////////////////////////////////////////////

import { Account, KeypairStr } from '@solana-suite/core';
import 'dotenv/config';

// 開発用の SOL を1SOL取得
const airdrop = async () => {
  const owner = new KeypairStr(process.env.SYSTEM_WALLET_ADDRESS || '', process.env.SYSTEM_WALLET_SECRET || '');

  console.log('#owner', owner);

  await Account.requestAirdrop(owner.toPublicKey());

  console.log('# owner balance: ', await Account.getBalance(owner.toPublicKey()));
};

airdrop();
