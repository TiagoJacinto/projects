import { UniqueEntityID } from './UniqueEntityID';

export type DomainEvent = {
  dateTimeOccurred: Date;
  getAggregateId(): UniqueEntityID;
};
