import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getClaySay(): string {
    return 'Clay Internationalization!';
  }
}
