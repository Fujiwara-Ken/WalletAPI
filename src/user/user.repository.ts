import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { AppDataSource } from '../data-source';

export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();

    user.email = createUserDto.email;
    user.password = createUserDto.password;

    AppDataSource.manager.save(user);
    return user;
  }

  async getUser(userId): Promise<User> {
    const user = new User();
    AppDataSource.manager.findOneBy(User, {
      userId,
    });

    return user;
  }
}
