import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    let token = request.headers.authorization;

    if (!token) {
      throw new ForbiddenException('not authenticated');
    }

    let decoded: any;

    try {
      decoded = jwt.verify(token, 'secret key');
    } catch (error) {
      throw new ForbiddenException('not authenticated');
    }

    return this.userModel
      .findOne({ username: decoded.username })
      .then((data) => {
        request.user = data;
        return true;
      })
      .catch((error) => {
        throw new ForbiddenException('not authenticated');
      });
  }
}
