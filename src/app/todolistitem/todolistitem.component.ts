import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-todolistitem',
  templateUrl: './todolistitem.component.html',
  styleUrls: ['./todolistitem.component.css']
})
export class TodolistitemComponent implements OnInit {

  constructor() { }


  @Input()
  item?: string;

  ngOnInit(): void {
  }

}
