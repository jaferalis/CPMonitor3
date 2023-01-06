import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from 'src/services/users.service';
import { AuthService } from '@auth0/auth0-angular';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() isRoleManager = true;
  
  constructor(private userService: UsersService, private auth0: AuthService) { 

    
  }

  ngOnInit(): void {

  }

  

}
