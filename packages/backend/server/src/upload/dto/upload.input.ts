import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class GetUploadSignatureInput {
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  invalidate: boolean;

  @IsString()
  @IsNotEmpty()
  folder: string;
}
