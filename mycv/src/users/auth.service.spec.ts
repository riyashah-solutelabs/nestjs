import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>; //bcz email in use and hashed pw banne test case find() no use kre 6 for different purpose - so aapde diffenret test case ma aa use kri skie
  beforeEach(async () => {
    const users: User[] = [];

    //Create a fake copy of the users service
    // const fakeUsersService: Partial<UsersService> = {
    fakeUsersService = {
      //only find and ccreate bcz authServie e usersService ma thi aa 2 method j use kre 6
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };
    //creating module/ new DI container
    const module = await Test.createTestingModule({
      // DI container create all the depencecies - classes here we want to register inside our DI container
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();
    //DI container sudhi pochi get a copy of the authentication service
    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    //this will be the user that saved in our db - so this user should have id, email, hashed pw
    const user = await service.signup('asdf@asdf.com', 'asdf');
    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });
  it('throws an error if user signs up with email that is in use', async () => {
    // fakeUsersService.find = () =>
    //   Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
    await service.signup('asdf@asdf.com', 'asdf');
    await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });
  //   it('throws an error if user signs up with email that is in use', async (done) => {
  //     //redefine the find function - means aama aapde find ma atleast one user joie 6
  //     fakeUsersService.find = () =>
  //       Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
  //     try {
  //       await service.signup('asdf@asdf.com', 'asdf');
  //     } catch (err) {
  //       done();
  //     }
  //   });

  it('throws if signin is called with an unused email', async () => {
    await expect(
      service.signin('asdflkj@asdlfkj.com', 'passdflkj'),
    ).rejects.toThrow(NotFoundException);
  });

  it('throws if an invalid password is provided', async () => {
    // fakeUsersService.find = () =>
    //   Promise.resolve([
    //     { email: 'asdf@asdf.com', password: 'laskdjf' } as User,
    //   ]);
    await service.signup('laskdjf@alskdfj.com', 'password');
    await expect(
      service.signin('laskdjf@alskdfj.com', 'laksdlfkj'),
    ).rejects.toThrow(BadRequestException);
  });

  it('returns a user if correct password is provided', async () => {
    // fakeUsersService.find = () =>
    // aa work nai kre bcz aapde password ma salted hashed pw provide krvo pde bcz code ma . thi split thay 6
    //   Promise.resolve([
    //     { email: 'asdf@asdf.com', password: 'laskdjf' } as User,
    //   ]);

    // solution
    // fakeUsersService.find = () =>
    //   Promise.resolve([
    //     {
    //       email: 'asdf@asdf.com',
    //       password:
    //         'fb0aa03f7b6b16c6.ef49f092664f109b63c44a44d98074083aefbd0d775438d7f3b738ddabcb03d0',
    //     } as User,
    //   ]);

    await service.signup('asdf@asdf.com', 'mypassword');
    const user = await service.signin('asdf@asdf.com', 'mypassword');
    expect(user).toBeDefined();

    //to get hashed pw upr nu comment kri bdhu aa niche vadu run krta console par hashed pw mdse
    // const user = await service.signup('asdf@asdf.com', 'mypassword');
    // console.log(user);
  });
});
