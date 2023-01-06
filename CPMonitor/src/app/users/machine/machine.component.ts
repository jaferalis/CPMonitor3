import { Component, OnInit } from '@angular/core';
import {MachinesService } from 'src/services/machines.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.css']
})
export class MachineComponent implements OnInit {

    // Start Definition of variables
    id: any;
    isAddMode: boolean= false;
    value = 'Clear me';
    
    machinename:string="";
    machinetype:string=""
    vendor:string=""
    vendorphone :number=0;
    selectedType:string ="";


    utcdate:string="";


    // Form builder code
    form = this.fb.group({
      position: [''],
      machinename: [''],
      machinetype: [''],
      purchasedate: [new Date()] ,    
      vendor: [''],
      vendorphone: [''],
      amcrenewal: [new Date()]
   
    });
    // End of form builder code    
  constructor(private machinesService: MachinesService,private fb: FormBuilder, public router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.id =params['Id'];
      }
    );
    this.isAddMode = !this.id;
    if (!this.isAddMode) {
      this.machinesService.getById(this.id)
        .subscribe(x => {
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
    
    this.machinesService.create(this.form.value).subscribe(data => {
      console.log(this.form.value);
      this.router.navigateByUrl('/users/machines');
    });
    else{
      this.machinesService.update(this.id,this.form.value).subscribe(data=>{
      this.router.navigateByUrl('/users/machines');
      });
    }

  }    

}
