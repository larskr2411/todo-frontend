import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: string = '';
  clickedButton: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {}

  async resetPassword() {
    const body = {
      email: this.email,
    };
    await this.http.post('http://localhost:1337/api/auth/forgot-password', body).toPromise();
    this.clickedButton = true;
  }


}
