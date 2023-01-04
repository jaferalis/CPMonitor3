import { Component, OnInit ,ViewChild} from '@angular/core';
// Selection model
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort'; 
import { MachinesService } from 'src/services/machines.service';
import { MatFormField } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { ExportService } from 'src/services/export.service';


export interface MachineElement {
  _id: number; // This alone is not shown in UI. But part of the record.
  machinename: string;
  machinetype: string;
  purchasedate: Date;
  vendor: string;
  vendorphone: number
  amcrenewal : Date
}


const ELEMENT_DATA: MachineElement[]=[{
  _id: 1, // This alone is not shown in UI. But part of the record.
  machinename: "ABC",
  machinetype: "CNC",
  purchasedate: new Date('2024-07-21'),
  vendor: "string",
  vendorphone: 12345678,
  amcrenewal : new Date('2024-07-21')

}];

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {

  displayedColumns: string[] = ['select', 'position','machinename', 'machinetype', 'purchasedate','vendor','vendorphone', 'amcrenewal'];
  //deviceSelection = new SelectionModel<OperatorElement>(true, []);
  
  machineSelection = new SelectionModel<MachineElement>(true, []);
  machines: MachineElement[];

  dataSource = new MatTableDataSource<MachineElement>();
  //dataSource :DeviceElement[];
  // @ViewChild('devicePaginator') paginator: any;
  // @ViewChild(MatSort) sort = new MatSort ();
  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource){
      this.dataSource.paginator = value;
    }
  }

  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    if (this.dataSource){
      this.dataSource.sort = value;
    }
  }  
  constructor(private machineservice: MachinesService , public router: Router, private exportService: ExportService) { 
    this.dataSource.paginator = this.paginator;
    this.machines = [];
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.machineservice.get().subscribe(machines => {
      this.machines = machines;
      this.dataSource.data= this.machines;
    });    
  }

  
  // Table check box selection


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.machineSelection.selected.length;
    const numRows = this.machines.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear deviceSelection. */
  masterToggle() {
    this.isAllSelected() ?
      this.machineSelection.clear() :
      this.machines.forEach(row => this.machineSelection.select(row));
  }  

  delete() {
    // iterated thru the selected devices and delete one by one
    for (let item of this.machineSelection.selected) {
      console.log(item._id);
      this.machineservice.delete(item._id).subscribe((data) => {
        window.location.reload();
      });
    }
  }

  edit() {
    // `${url}/${id}`
    for (let item of this.machineSelection.selected) {
      this.machineservice.getById(item._id).subscribe((data) => {
        //send the data for the child form
        // this.router.navigateByUrl('devices/device?Id:${item._id}');
        this.router.navigateByUrl('users/machines/machine?Id=' + item._id);
      });
    }

  }

  exportexcel(){
    this.exportService.exportexcel();
  
  }

  exportpdf(){
    this.exportService.exportpdf();
  
  }

  copyData2() {
    var dataArray = "";

    this.machines.forEach(row => {
      dataArray += this.ObjectToArray(row) + "\n";

    })

    return dataArray;
  }

  ObjectToArray(obj: object): string {
    let val = "";
    var result = Object.keys(obj).map(() => {
     // console.log(Object.values(obj));
      val = Object.values(obj).toString();
    });
    return val;
  }

  searchThis(data:string){
    this.dataSource.filter = data;
  }



}
