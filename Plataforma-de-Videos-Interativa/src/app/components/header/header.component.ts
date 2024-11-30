import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { User } from '@auth0/auth0-angular';

import { AuthService } from '../../services/auth/auth.service';

import { SearchBarComponent } from "../search-bar/search-bar.component";
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchBarComponent, ButtonComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  profile!: User | null | undefined;
  isAuthenticated!: boolean;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.getUser().subscribe(profile => this.profile = profile);

    this.auth.isAuthenticated().subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
  }

  login () {
    this.auth.login();
  }

  logout () {
    this.auth.logout();
  }

}
