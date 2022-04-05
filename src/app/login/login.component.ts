import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = ''
  passwort: string = ''

  errorHasOccurred: boolean = false;
  savePassword: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    //gespeicherte daten auslesen und in variablen speichern
    this.username = localStorage.getItem('username') || '';
    this.passwort = localStorage.getItem('passwort') || '';
  }

  async login(){
    // http post an http://localhost:1337/api/auth/local mit login daten schicken
    // auf error pruefen
    // wenn error, return
    // wenn kein error, weiter
    // token aus der antwort abspeichern
    //auf todo liste leiten

    try {
      let response: any = await this.http.post('http://localhost:1337/api/auth/local',
        {
          identifier: this.username,
          password: this.passwort
        }
      ).toPromise();

      if (response == undefined) {
        return;
      }

      if (response.error) {
        // TODO: Show error message
        return;
      }


      if(this.savePassword) {
        this.saveData();
      } else {
        localStorage.removeItem('username')
        localStorage.removeItem('passwort')
      }

      window.localStorage.setItem('token', response.jwt);
      await this.router.navigate(['/']);
    } catch (e) {
      this.errorHasOccurred = true;
    }

  }


  saveData() {
    window.localStorage.setItem("username", this.username)
    window.localStorage.setItem("passwort", this.passwort)

  }
}




