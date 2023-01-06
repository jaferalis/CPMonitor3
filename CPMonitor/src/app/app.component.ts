import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {  Router } from '@angular/router';
import { ThemeService } from 'src/services/theme.service';
import { UserElement, UsersService } from 'src/services/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CPMonitor';
  isAuthenticated: boolean =false;
  opened:boolean= true;
  homeOnly = false;

  constructor(private auth0: AuthService, public router: Router,private themeService: ThemeService, private userService:UsersService){
    auth0.isAuthenticated$.subscribe(result=>{
      if (!result){
        auth0.loginWithRedirect();
      }
      else{
        //authentication get the user
        auth0.getUser().subscribe(user=>{
          console.log(user?.email);
       
           userService.get("jafer@cp.com").subscribe(usr=>{
            alert(usr);
            console.log(usr);
           });
        });
               
      }
    });

  }
  
  toggleMenu(){
    this.opened =!this.opened;
  }
  toggleHome(){
    alert("home")
    this.homeOnly = false;
  }

  switchTheme(theme: string) {
    this.themeService.theme = theme;
  }
}
