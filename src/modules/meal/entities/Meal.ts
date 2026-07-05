import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace';

interface MealSchema {
  name: string;
  description: string | null;
  dateTime: Date;
  isOnDiet: boolean;
  userId: string;
}

export class Meal {
  private props: MealSchema;
  private _id: string;

  constructor(
    props: Replace<MealSchema, { description?: string | null }>,
    id?: string,
  ) {
    this.props = {
      ...props,
      description: props.description ?? null,
    };
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get description(): string | null {
    return this.props.description;
  }

  set description(description: string | null) {
    this.props.description = description;
  }

  get dateTime(): Date {
    return this.props.dateTime;
  }

  set dateTime(dateTime: Date) {
    this.props.dateTime = dateTime;
  }

  get isOnDiet(): boolean {
    return this.props.isOnDiet;
  }

  set isOnDiet(isOnDiet: boolean) {
    this.props.isOnDiet = isOnDiet;
  }

  get userId(): string {
    return this.props.userId;
  }
}
