import { Component, OnInit } from '@angular/core';
import gameOn from './rxjs-alphabet-invasion'

@Component({
  selector: 'app-alphabet-invasion',
  templateUrl: './alphabet-invasion.component.html',
  styleUrls: ['./alphabet-invasion.component.css']
})
export class AlphabetInvasionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    gameOn();
  }

}
