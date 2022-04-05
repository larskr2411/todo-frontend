import { ComponentFixture, TestBed } from '@angular/core/testing';

import {Aufgabe, TodolistComponent} from './todolist.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {BrowserTestingModule} from "@angular/platform-browser/testing";
import {AppRoutingModule} from "../app-routing.module";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgPipesModule, OrderByPipe} from "ngx-pipes";
import {TodoServiceService} from "../todo-service.service";

describe('TodolistComponent', () => {
  let component: TodolistComponent;
  let fixture: ComponentFixture<TodolistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodolistComponent ],
      imports: [
        BrowserTestingModule,
        AppRoutingModule,
        FormsModule,
        CommonModule,
        NgPipesModule,
        HttpClientTestingModule,
      ],
      providers: [OrderByPipe, TodoServiceService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe("notizHinzufügen", () => {
    it("add = 0", () => {
      const aufgabe = { add: 0 };
      component.notizHinzufuegen((aufgabe as unknown) as Aufgabe);
      expect(aufgabe).toEqual({ add: 1 });
    });

    it("add = 1", () => {
      const aufgabe = { add: 1 };
      component.notizHinzufuegen((aufgabe as unknown) as Aufgabe);
      expect(aufgabe).toEqual({ add: 0 });
    });

    it("add = -1", () => {
      const aufgabe = { add: -1 };
      component.notizHinzufuegen((aufgabe as unknown) as Aufgabe);
      expect(aufgabe).toEqual({ add: 1 });
    });

    it("add = 2", () => {
      const aufgabe = { add: 2 };
      component.notizHinzufuegen((aufgabe as unknown) as Aufgabe);
      expect(aufgabe).toEqual({ add: 1 });
    });
  })
});
