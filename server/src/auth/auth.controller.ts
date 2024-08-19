import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('get-nonce')
  async getNonce() {
    return { nonce: await this.authService.getNonce() };
  }

  @Post('verify-user')
  async verifyUser(@Body('accountProofData') accountProofData: any) {
    return this.authService.verifyUser(accountProofData);
  }
}
