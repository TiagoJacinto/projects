import { DomainEvent, UniqueEntityID } from '@tiagojacinto/domain-primitives';
import { User } from '../user.aggregate';

export class UserCreatedEvent implements DomainEvent {
  public readonly dateTimeOccurred: Date;
  public readonly user: User;

  constructor(user: User) {
    this.dateTimeOccurred = new Date();
    this.user = user;
  }

  getAggregateId(): UniqueEntityID {
    return this.user.id;
  }
}
