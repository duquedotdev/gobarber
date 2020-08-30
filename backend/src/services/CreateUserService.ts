import { getRepository } from 'typeorm';
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
    const user = usersRepository.create({ name, email, password });
    await usersRepository.save(user);
    return user;
  }
}