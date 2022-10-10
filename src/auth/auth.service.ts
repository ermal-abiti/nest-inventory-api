import { ForbiddenException, Inject, Injectable, Scope } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { TokenDto } from './dtos/token.dto';
import * as bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

export type RequestWithUser = Request & { user: User };

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: any, @Inject(REQUEST) private readonly request: RequestWithUser) {}

  async login(data: LoginDto) {
    let user = await this.userModel.findOne({ email: data.email });
    
    if (!user) {
      throw new ForbiddenException('invalid credentials');
    }

    if (!(await bcrypt.compare(data.password, user.password))) {
      throw new ForbiddenException('invalid credentials');
    }

    // Generate token
    const token = sign({email: user.email}, 'secret key');
    const response: TokenDto = { token };

    return response;
  }

  async register(data: RegisterDto) {
    let newUser = new this.userModel(data);

    // Hash Password
    newUser.password = await bcrypt.hash(newUser.password, 12);
    
    // Generate token
    const token = sign({ email: newUser.email }, 'secret key');
    const response: TokenDto = { token };

    await newUser.save();

    return response;
  }

  async getAuthUser() {
      return this.request.user;
  }
}
