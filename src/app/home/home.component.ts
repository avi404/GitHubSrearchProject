import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
// note 
export class HomeComponent implements OnInit {
  constructor(private router: Router, public http: HttpClient, private authService: AuthService, private tokenStorage: TokenStorageService) { }
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: string;

  ngOnInit() {

    if (this.tokenStorage.getToken()) {

      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
      setTimeout(() => {    
        this.router.navigate(['fetch-data']);
      },
        2000);
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(this.form.username);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
 
        // this.reloadPage();
        this.currentUser = this.form.username;
        setTimeout(() => {
          // this.router.navigate(['/']);
          this.router.navigate(['fetch-data']);
        }, 2000);

      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}


