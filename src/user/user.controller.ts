import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

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
}
