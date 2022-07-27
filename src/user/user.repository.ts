import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { AppDataSource } from 'src/data-source';

export class UserRepository extends Repository<User> {
  async getUser(userId): Promise<User> {
    const user = new User();
    AppDataSource.manager.findOneBy(User, {
      userId,
    });

    return user;
  }
}
