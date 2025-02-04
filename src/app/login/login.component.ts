import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string = 'Vous êtes deconnecté';
  name: string;
  password: string;
  auth: AuthService;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth = this.authService
  }

  setMessage() {
    if (this.authService.isLoggedIn) {
      this.message = 'Vous êtes connecté';
    } else {
      this.message = 'Identifiant ou mot de passe incorrect.name: pikachu, MDP: pikachu';
}
  }

  login() {
    this.message = 'tentaive de connexion en cours ...';
    this.authService.loginIn(this.name, this.password)
      .subscribe((isLoggidIn: boolean) => {
        this.setMessage();
        if (isLoggidIn) {
          this.router.navigate(['/pokemons'])
        } else {
          this.password = '';
          this.router.navigate(['/login'])
        }
    })
  }

  logout() {
    this.authService.logOut();
    this.message = 'Vous êtes deconnecté';
  }

}
