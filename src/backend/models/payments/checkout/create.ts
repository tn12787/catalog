import { IsOptional, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import Stripe from 'stripe';

export class CreateCheckoutSessionDto {
  @IsNotEmpty()
  @IsString()
  priceId: Stripe.Price['id'];

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @IsNotEmpty()
  @IsString()
  workspaceId: string;
}
