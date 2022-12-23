import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  opened = true;
  @Output() newItemEvent = new EventEmitter<Boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(){
    this.opened = !this.opened;
    this.newItemEvent.emit(this.opened);
  }

}
