import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  mailAdress: string = '';
  username: string = '';
  password: string = '';


  checkAgb: boolean = false;
  agbNotAccept: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  async registerNow() {
    if(this.checkAgb == true) {

      let response: any = await this.http.post('http://localhost:1337/api/auth/local/register', {
        email: this.mailAdress,
        username: this.username,
        password: this.password
      }).toPromise();
      window.localStorage.setItem('token', response.jwt)
      await this.router.navigate(['/'])
    } else {
      this.agbNotAccept = true;
    }
  }

}
