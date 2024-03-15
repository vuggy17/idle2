import { IsString } from 'class-validator';

export abstract class BaseModel {
  @IsString()
  id: string;

  createdAt: Date;

  updatedAt: Date;
}
