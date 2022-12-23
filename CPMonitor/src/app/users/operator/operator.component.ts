import { Component, OnInit } from '@angular/core';
import { OperatorsService } from 'src/services/operators.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-operator',
  templateUrl: './operator.component.html',
  styleUrls: ['./operator.component.css']
})
export class OperatorComponent implements OnInit {
    // Start Definition of variables
    id: any;
    isAddMode: boolean= false;
    value = 'Clear me';
    name:string=""
    phonenumber :number=0;
    utcdate:string="";


    // Form builder code
    form = this.fb.group({
      position: [''],
      name: [''],
      joindate: [new Date()] ,    
      phonenumber: ['']
   
    });
    // End of form builder code  


    //End definition of variables
  constructor(private operatorService: OperatorsService,private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.id =params['Id'];
      }
    );
    this.isAddMode = !this.id;
    if (!this.isAddMode) {
      this.operatorService.getById(this.id)
        .subscribe(x => {
         // alert(JSON.stringify(x));  
        //   Not sure why array[0] deos not work. I had to strip the box squar []s and make JSON object again
         let temp = JSON.stringify(x);
         temp = temp.substring(1,temp.length-1)       
          this.form.patchValue(JSON.parse(temp));
        });
    }    
  }

  onSubmit() {
    if (this.isAddMode)
    //process the date format here and assign
    
    this.operatorService.create(this.form.value).subscribe(data => {
      console.log(this.form.value);
      this.router.navigateByUrl('/users/operators');
    });
    else{
      this.operatorService.update(this.id,this.form.value).subscribe(data=>{
      this.router.navigateByUrl('/users/operators');
      });
    }

  }  

  onDateChange(){
    alert("date change" + document.getElementById('#picker')?.innerText);

    
  }

}
