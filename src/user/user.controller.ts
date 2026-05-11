import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller()
export class UserController {
  @MessagePattern({ cmd: 'user.ping' })
  ping(): string {
    return '[User] I am alive.';
  }

  @MessagePattern({ cmd: 'user.error' })
  testError(): never {
    throw new RpcException('This is a test RPC error from User Service');
  }
}
