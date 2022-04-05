import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  code: string = '';
  password: string = '';
  passwordConfirmation: string = '';
  clickedButton: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          console.log(params); // { orderby: "price" }
          this.code = params['code'];
          console.log(this.code); // price
        }
      );
  }

  async resetPassword() {
  const body = {
    code: this.code,
    password: this.password,
    passwordConfirmation: this.passwordConfirmation
  }
    await this.http.post('http://localhost:1337/api/auth/reset-password', body).toPromise();

  this.clickedButton = true;
}

}
