import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { AppDataSource } from 'src/data-source';
import { CreateUserDto } from './dto/create-user.dto';
// import * as bcrypt from 'bcrypt';

export class AuthRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();

    user.email = createUserDto.email;
    user.password = createUserDto.password;

    AppDataSource.manager.save(user);
    return user;
  }
}
