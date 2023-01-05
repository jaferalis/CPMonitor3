import { Component, OnInit } from '@angular/core';
import { DevicesService } from 'src/services/devices.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OperatorsService } from 'src/services/operators.service';
import { MachinesService } from 'src/services/machines.service';



interface MachineType {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  // 
  position: number = 0;
  date: string = "";
  machinename: string = "";
  machinetype: string ="";
  description: string = "";
  operator: string = "";
  rawqty: number = 0;
  achievedqty: number = 0;
  remarks: string = "";
  operators:any;
  machinetypes:any;
  machinenames:any;


  


  selectedName:string = "";
  selectedType:string = "";
  selectedOperator:string = ""
  
  // Form builder code
  deviceForm = this.fb.group({
    position: [''],
    date: [''],
    machinename: [''],
    machinetype: [''],
    description: [''],
    operator: [''],
    rawqty: [''],
    achievedqty: [''],
    remarks: [''],
   
  });
  // End of form builder code  

  value = 'Clear me';
  isAddMode = false;
  id: any;
  constructor(private deviceService: DevicesService, private fb: FormBuilder, private router: Router,
    private route: ActivatedRoute, private operatorService:OperatorsService, private machineService:MachinesService) { }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        this.id =params['Id'];
      }
    );
    this.isAddMode = !this.id;
    if (!this.isAddMode) {
      this.deviceService.getById(this.id)
        .subscribe(x => {
         // alert(JSON.stringify(x));  
        //   Not sure why array[0] deos not work. I had to strip the box squar []s and make JSON object again
         let temp = JSON.stringify(x);
         temp = temp.substring(1,temp.length-1)       
          this.deviceForm.patchValue(JSON.parse(temp));
        });
    }

    //get the machine types here and put in list
    this.machineService.get().subscribe(machines => {
      // This gives the uniquer set of machine types removig duplicated if any in machines
      let unique = [...new Set(machines.map(machine => machine.machinetype))];
      this.machinetypes = unique;
      let namelist = machines.map(machine => machine.machinename);
      this.machinenames = namelist;
    }); 
    //get the operator names here and put in list
    this.operatorService.get().subscribe(operators => {
      this.operators = operators;
    });    
  }

  onSubmit() {
    if (this.isAddMode)
    this.deviceService.createDevice(this.deviceForm.value).subscribe(data => {
      this.router.navigateByUrl('/devices');
    });
    else{
      this.deviceService.updateDevice(this.id,this.deviceForm.value).subscribe(data=>{
      this.router.navigateByUrl('/devices');
      });
    }

  }

}
