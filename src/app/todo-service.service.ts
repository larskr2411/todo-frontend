import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  constructor(private http: HttpClient) { }

  async getPosts(): Promise<any[]> {
    const response = await this.http.get('https://jsonplaceholder.typicode.com/posts').toPromise();
    console.log(response);
    return <any[]>  response;
  }

}
