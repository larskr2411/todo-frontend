import { Component, OnInit } from '@angular/core';
import {TodoServiceService} from "../todo-service.service";
import {HttpClient} from "@angular/common/http";
import {TodolistitemComponent} from "../todolistitem/todolistitem.component";

export type Aufgabe = {
  name: string;
  deadLine: Date;
  note?: string;
  done?: boolean;
  add: number;
  id?: number;
}

interface TodoListItem {
  "id": number;
  "attributes": {
    "name": string;
    "deadLine": string;
    "note": string;
    "done": boolean;
    "createdAt": string;
    "updatedAt": string;
  }
}

interface TodoListItemCreationResponse {
  "data": TodoListItem,
  "meta": {}
}

interface TodoListItemsResponse {
  data: TodoListItem[]
}

interface ToDoListNotes {
  "name": string;
  "data": TodoListItem,
}

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {
  neueAufgabe: string = '';
  basePath: string = 'http://localhost:1337/api';

  aufgaben: Aufgabe[] = []

  deadLineYear: number = 2022;
  deadLineMonth: number = 11;
  deadLineDay: number = 5;

  tasks: number = 0;
  posts: any[] = [];

  constructor(private http: HttpClient) {
  }

  getAuthOptions() {
    return {
      headers: {
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),

      }
    };
  }

  async ngOnInit() {
    const todolistItems = await this.http.get<TodoListItemsResponse>(this.basePath + '/todo-list-items', this.getAuthOptions()).toPromise();
    if (todolistItems === undefined) {
      this.aufgaben = [];
    } else {
      this.aufgaben = todolistItems.data.map((item) => {
        const aufgabe: Aufgabe = {
          name: item.attributes.name,
          deadLine: new Date(item.attributes.deadLine),
          done: item.attributes.done,
          note: item.attributes.note,
          add: 0,
          id: item.id,
        }
        console.log(aufgabe)
        return aufgabe;
      });
    }
    //await this.http.delete('http://localhost:1337/api/todo-list-items/6').toPromise();
  }

  async aufgabeHinzufuegen() {
    const aufgabe: Aufgabe = {
      name: this.neueAufgabe,
      deadLine: new Date(this.deadLineYear, this.deadLineMonth - 1, this.deadLineDay),
      add: 0
    };
    this.aufgaben.push(aufgabe);
    this.neueAufgabe = '';
    console.log(this.aufgaben)
    const newItem = await this.http.post<TodoListItemCreationResponse>('http://localhost:1337/api/todo-list-items', {
        data: aufgabe
      },
      this.getAuthOptions()
    ).toPromise();
    if (newItem !== undefined) {
      aufgabe.id = newItem.data.id;
    }

  }

  async resetAufgaben() {
    for (let i = 0; i != this.aufgaben.length; i++) {
      const url = 'http://localhost:1337/api/todo-list-items/' + this.aufgaben[i].id;
      await this.http.delete(url, this.getAuthOptions())
        .toPromise();
    }

    this.aufgaben = [];
  }

  async aufgabeLoeschen(aufgabe: Aufgabe) {
    try {
      await this.http.delete('http://localhost:1337/api/todo-list-items/' + aufgabe.id, this.getAuthOptions()).toPromise()
      this.aufgaben.splice(this.aufgaben.indexOf(aufgabe), 1);
    } catch(err) {
      if ((err as any)?.status === 404) {
        this.aufgaben.splice(this.aufgaben.indexOf(aufgabe), 1);
      } else {
        throw err;
      }
    }
  }

  async notizHinzufuegen(aufgabe: Aufgabe) {
    console.log(aufgabe);
    await this.http.put<TodoListItem>('http://localhost:1337/api/todo-list-items/' + aufgabe.id, {
      data: {
        note: aufgabe.note
      }
    }, this.getAuthOptions()).toPromise();

    if (aufgabe.add === 1) {
      // notiz wird angezeigt { add: 1 }
      aufgabe.add = 0;
    } else {
      // notiz wird nicht angezeigt { add: 0 }
      aufgabe.add = 1;
    }
  }

  openTasks() {
    return this.aufgaben.filter(aufgabe => {
      return !aufgabe.done;
    }).length
  }

  closedTasks() {
    return this.aufgaben.filter(aufgabe => {
      return aufgabe.done;
    }).length
  }


  async showNote() {
    for (let position = 0; position < this.aufgaben.length; position++) {
      const aufgabe = this.aufgaben[position];
      if (aufgabe.add === 1) {
        aufgabe.add = 0;
      } else {
        aufgabe.add = 1;
      }

      try {
        await this.http.put<TodoListItem>('http://localhost:1337/api/todo-list-items/' + aufgabe.id, {
          data: {
            note: aufgabe.note
          }
        }, {
          headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem('token')
          }
        }).toPromise();
      } catch(err) {
        console.error(err);
        window.location.href = '/login'
      }


    }

  }

  async checkBox(aufgabe: Aufgabe) {
    await this.http.put<TodoListItem>('http://localhost:1337/api/todo-list-items/' + aufgabe.id, {
      data: {
        "done": aufgabe.done
      }
    }).toPromise();
  }


  getTodoPercentage() {
    const closedTasks = this.closedTasks();
    const tasks = this.aufgaben.length;
    return (closedTasks / tasks) * 100;
  }
}

