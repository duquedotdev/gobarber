import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../model/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const checkUsersExist = await usersRepository.findOne({
      where: { email },
    });
    if (checkUsersExist) {
      throw new Error('Email address already used');
    }

    const hashedPassword = await hash(password, 8);
    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await usersRepository.save(user);
    return user;
  }
}
