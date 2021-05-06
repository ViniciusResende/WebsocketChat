import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository"


class UsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create(email: string) {
    //Verificar se o usuario existe

    const UserAlreadyExists = await this.usersRepository.findOne({ email });

    //Se existir retornar user
    if(UserAlreadyExists){
      return UserAlreadyExists;
    }

    
    //Se não existir salvar no DB
    const user = this.usersRepository.create({
      email
    });

    await this.usersRepository.save(user);

    return user;
  }

  async findByEmail(email: string) {
    const UserAlreadyExists = await this.usersRepository.findOne({ email });

    if(UserAlreadyExists){
      return UserAlreadyExists;
    }

    return;
  }
}

export { UsersService }