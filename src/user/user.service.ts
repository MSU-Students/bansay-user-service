import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserStatus } from '../enums/user-status.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    const existingUser = await this.userRepository.findOneBy({
      username: dto.username,
    });

    if (existingUser) throw new ConflictException('Username already exists.');

    try {
      const newUser = this.userRepository.create({
        ...dto,
        status: dto.status ?? UserStatus.ACTIVE,
      });

      const saved = await this.userRepository.save(newUser);

      const { password, ...result } = saved;
      return result;
    } catch {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
