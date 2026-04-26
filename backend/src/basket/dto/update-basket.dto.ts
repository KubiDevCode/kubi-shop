import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateBasketDto {
    @IsString()
    productId!: string;

    @IsOptional()
    @IsInt()
    @IsPositive()
    quantity?: number;
}