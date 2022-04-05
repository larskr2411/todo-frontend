import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {


  @Input()
  test?: string;

  liste = [
    {
      "name": "Lars"
    },
    {
      "name": "Peter"
    },
    {
      "name": "Peter"
    },
    {
      "name": "Peter"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

  zeigewas() {
    this.test = this.test + ' hallo';
    window.localStorage.setItem('test', JSON.stringify(this.liste));
    console.log(JSON.stringify(this.liste))
    // @ts-ignore
    console.log(JSON.parse(window.localStorage.getItem('test')));
  }

}
