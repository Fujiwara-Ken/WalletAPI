import { Injectable } from '@nestjs/common';
import { GetNftListDto } from './dto/get-nftlist-dto';
import { getNftMetadata, getTokenInfoOwned } from './solana/getMetadata';
import { filterOwnToken } from './util/filterOwnToken';

@Injectable()
export class NftService {
  // 指定したウォレットアドレスの所有NFTを取得
  async getNftList(getNftListDto: GetNftListDto) {
    const ownedNftList = await getTokenInfoOwned(getNftListDto.walletAddress);
    const filteredOwnToken = await filterOwnToken(ownedNftList);
    const response = await getNftMetadata(filteredOwnToken);
    return response;
  }
}
