import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import { FlowService } from 'src/flow/flow.service';

@Injectable()
export class AuthService {
  private readonly nonces: string[] = [];

  constructor(
    private readonly flowService: FlowService,
    private readonly jwtService: JwtService,
  ) {}

  async getNonce() {
    const nonce = crypto.randomBytes(32).toString('hex');
    this.nonces.push(nonce);
    return nonce;
  }

  async verifyUser(accountProofData) {
    console.log(this.nonces);
    console.log(accountProofData);

    if (!this.nonces.includes(accountProofData.nonce))
      throw new UnauthorizedException();

    const indexOfNonce = this.nonces.indexOf(accountProofData.nonce);
    this.nonces.splice(indexOfNonce, 1);
    const isVerify =
      await this.flowService.verifyAccountProof(accountProofData);
    console.log(isVerify);
    if (!isVerify) throw new UnauthorizedException();

    const payload = { address: accountProofData.address };
    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
