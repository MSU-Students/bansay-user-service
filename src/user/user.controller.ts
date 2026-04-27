import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  @MessagePattern({ cmd: 'user.ping' })
  ping(): string {
    return '[User] I am alive.';
  }
}
