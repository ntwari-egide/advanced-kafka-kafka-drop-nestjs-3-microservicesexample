import { Injectable } from '@nestjs/common';
import { GetUserRequest } from './get-user-request.dto';

@Injectable()
export class AppService {
  // simple in memory array
  private readonly users: any[] = [
    {
      userId: '123',
      stripeUserId: '43323',
    },
    {
      userId: '345',
      stripeUserId: '234883',
    },
  ];

  getHello(): string {
    return 'Hello World!';
  }

  getUser(userRequest: GetUserRequest) {
    return this.users.find((user) => user.userId === userRequest.userId);
  }
}
