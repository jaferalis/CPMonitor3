import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import {  Router } from '@angular/router';
import { ThemeService } from 'src/services/theme.service';
import { UsersService } from 'src/services/users.service';


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
  isManager = true;

  constructor(private auth0: AuthService, public router: Router,private themeService: ThemeService, private userService:UsersService){
    auth0.isAuthenticated$.subscribe(result=>{
      if (!result){
        auth0.loginWithRedirect();
      }
      else{
        //authentication get the user
       
        auth0.getUser().subscribe(user=>{
          if(!user?.email_verified){
            alert("Please verify the mail link");
            auth0.loginWithRedirect();
          }          
          console.log(user?.email);
          console.log("email verified" + user?.email_verified);
          console.log("email verified" + user?.email_verified);
           userService.get(user?.email).subscribe(usr=>{
            if(usr.length > 0)
            {
              userService.setRole(usr[0].role);
              this.isManager = userService.isRoleManager();
            }
           
           });
        });
        
               
      }
    });

  }
  
  toggleMenu(){
    this.opened =!this.opened;
  }
  toggleHome(){

    this.homeOnly = false;
  }

  switchTheme(theme: string) {
    this.themeService.theme = theme;
  }
}
