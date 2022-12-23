import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: any;
  opened: Boolean = false;

  @Output() newItemEvent = new EventEmitter<Boolean>();
  constructor( @Inject(DOCUMENT) public document: Document, private auth0 : AuthService) { 


  }

  user$ = this.auth0.user$;
  authenticated$ = this.auth0.isAuthenticated$

  ngOnInit(): void {

  }

  logout(){
    this.auth0.logout();
  }

  getUserName(){
    this.auth0.getUser().subscribe(user =>{
      this.userName= user;
 });
  }

  search(){

  }

  toggleMenu(){
    this.opened = !this.opened;
    this.newItemEvent.emit(this.opened);
  }
}
