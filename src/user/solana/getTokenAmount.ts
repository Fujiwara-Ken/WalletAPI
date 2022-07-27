import { Account } from '@solana-suite/core';

// 指定したSPLトークンの合計を取得
export const getTokenAmount = async (walletAddress: string) => {
  const mint = process.env.TOKEN_KEY as string;

  const amount = await Account.getTokenBalance(
    mint.toPublicKey(),
    walletAddress.toPublicKey()
  );
  console.log('# token history by publish: ', amount.unwrap());

  return amount;
};
