import {CanActivate} from "@angular/router";

export class AuthGuard implements CanActivate{
  canActivate(): boolean {
    //wenn token im localstorage gesetzt --> true sonst false
    if(localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }

  }

}
