import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class User {
  id: number;
}

@Injectable()
export class UserService {
  findTableInfo(name?: string): any {
    if (name) {
      const params = { name };
      return this.httpClient.get(`user/findTableInfo`, { params });
    } else {
      return this.httpClient.get(`user/findTableInfo`);
    }
  }
  delete(id: number): any {
    const body = {
      params: {
        id: id.toString(),
      },
    };
    return this.httpClient.delete(`user/delete`, body);
  }

  constructor(
    private httpClient: HttpClient
  ) { }
}
