import { Injectable } from '@angular/core';

@Injectable()
export class ContrastService {
  getContrast(): string {
    return '勾选本协议意味着你打心底里认为,作者是程序员里最帅的男孩子!';
  }
}
