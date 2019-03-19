import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDTO } from '../../others/response.dto';
import { User } from '../../auth/user.dto';

@Injectable()
export class ProfileService {
  constructor(private httpClient: HttpClient) { }
  getUser(id): ResponseDTO | any {
    const params = { id };
    return this.httpClient.get(`user/getUser`, { params });
  }
  save(user: User): ResponseDTO | any {
    return this.httpClient.post(`user/update`, user);
  }
}
