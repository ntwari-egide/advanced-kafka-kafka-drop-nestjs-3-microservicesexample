import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { GetUserRequest } from './get-user-request.dto';
import { OrderCreatedEvent } from './order-created.event';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  handleOrderCreated(orderCreatedEvent: OrderCreatedEvent) {
    // console.log(orderCreatedEvent);

    // we are going to subscribe on initialized
    this.authClient
      .send('get_user', new GetUserRequest(orderCreatedEvent.orderId))
      .subscribe((user) => {
        console.log(
          `Billing user with stripe ID  ${user.stripeUserId} a price of ${orderCreatedEvent.price} ...`,
        );
      });
  }
}