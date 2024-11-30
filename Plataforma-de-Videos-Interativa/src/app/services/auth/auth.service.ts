import { Injectable } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { UserService } from '../user/user.service';
import { User } from '../../types/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth0: Auth0Service, private userService: UserService) { }

  login () {
    this.auth0.loginWithRedirect();
  }

  logout () {
    this.auth0.logout({
      logoutParams: { returnTo: window.location.origin },
    });
  }

  getUser() {
    return this.auth0.user$;
  }

  isAuthenticated() {
    return this.auth0.isAuthenticated$;
  }

  handleUserData() {
    this.auth0.user$.subscribe(user => {
      if (user) {
        const userData = {
          id: user.sub || '',
          name: user.name || 'Usuário',
          email: user.email || '',
          socialLoginProvider: user.sub?.split('|')[0] || 'auth0',
        }

        this.userService.getUserById(userData.id).subscribe(userExists => {
          if (userExists.length === 0) {
            this.userService.createUser(userData).subscribe(() => {
              console.log('Usuário criado');
            });
          }
        });
      }
    });
  }

}
