import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: 'user.ping' })
  ping(): string {
    return '[User] I am alive.';
  }

  @MessagePattern({ cmd: 'user.create' })
  create(@Payload() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @MessagePattern({ cmd: 'user.findAll' })
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern({ cmd: 'user.findById' })
  findById(@Payload() data: { id: number }) {
    return this.userService.findById(data.id);
  }

  @MessagePattern({ cmd: 'user.update' })
  update(@Payload() data: { id: number; dto: UpdateUserDto }) {
    return this.userService.update(data.id, data.dto);
  }
}
