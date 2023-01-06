import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/services/users.service';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    // Start Definition of variables
    id: any;
    isAddMode: boolean= false;
    value = 'Clear me';
    name:string="";
    email: string ="";
    phonenumber :number=0;
    utcdate:string="";
    selectedRole: string= "Manager";


    // Form builder code
    form = this.fb.group({
      position: [''],
      name: [''],  
      email: [''],
      role:['']
  
    });
    // End of form builder code    
  constructor(private userService: UsersService,private fb: FormBuilder, public router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.id =params['Id'];
      }
    );
    this.isAddMode = !this.id;
    if (!this.isAddMode) {
      this.userService.getById(this.id)
        .subscribe(x => {
        //   Not sure why array[0] deos not work. I had to strip the box squar []s and make JSON object again
         let temp = JSON.stringify(x);
        // temp = temp.substring(1,temp.length-1)       
          this.form.patchValue(JSON.parse(temp));
        });
    }       
  }

  onSubmit() {
    if (this.isAddMode)
    //process the date format here and assign
    
    this.userService.create(this.form.value).subscribe(data => {
      console.log(this.form.value);
      this.router.navigateByUrl('/users');
    });
    else{
      this.userService.update(this.id,this.form.value).subscribe(data=>{
      this.router.navigateByUrl('/users');
      });
    }

  }    

}
