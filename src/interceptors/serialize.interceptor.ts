import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass, plainToInstance } from 'class-transformer';

// Interface type for any class (optional)
interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {
    this.dto = dto
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Run before request handler (can be used to customize data validation, instead of using validation pipe which is more automatic)
    return next.handle().pipe(
      map((data: any) => {
        // Run something before the response is sent out
        return plainToInstance(this.dto, data, { excludeExtraneousValues: true });
      }),
    );
  }
}
