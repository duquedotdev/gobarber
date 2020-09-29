import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new User', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'password123',
    });
    expect(user).toHaveProperty('id');
  });

  it('should no be able to create a new User with a same email', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'password123',
    });
    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'john@doe.com',
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
