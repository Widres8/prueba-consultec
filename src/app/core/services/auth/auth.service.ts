import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { tap } from 'rxjs/internal/operators/tap';

import { User } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly url: string = 'assets/data/user.json';
  public readonly userKey: string = 'US3R';
  public user: User = Object.assign({});

  constructor(private http: HttpClient, private storage: Storage) {}

  login(): Promise<User> {
    return firstValueFrom(
      this.http.get<User>(this.url).pipe(tap((user) => this.storageUser(user)))
    );
  }

  logout() {
    this.storage.removeItem(this.userKey);
  }

  storageUser(user: User) {
    this.user = user;
    this.storage.setItem(this.userKey, JSON.stringify(user));
  }

  async isAuthenticate(): Promise<boolean> {
    let result = this.storage.getItem(this.userKey);
    return result != null;
  }
}
