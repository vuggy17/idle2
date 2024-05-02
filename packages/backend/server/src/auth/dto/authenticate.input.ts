import { IsNotEmpty, IsString } from 'class-validator';

export class AuthenticateInput {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
