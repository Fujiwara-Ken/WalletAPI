import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
// import * as bcrypt from 'bcrypt';

export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    // const salt = await bcrypt.genSalt();
    // const hashPassword = await bcrypt.hash(password, salt);

    // const user = this.create({ email, password: hashPassword });

    const user = this.create({ email, password });

    await this.save(user);
    return user;
  }
}
