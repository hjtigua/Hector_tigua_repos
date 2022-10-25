import { IsInt, IsString, MinLength } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  @MinLength(4)
  name: string;

  @IsInt()
  status: number;
}
