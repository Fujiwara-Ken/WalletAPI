import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { User } from 'src/entities/user.entity';

@Controller('nft')
export class NftController {}
