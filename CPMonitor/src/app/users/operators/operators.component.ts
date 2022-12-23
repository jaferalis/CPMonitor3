import { Component, OnInit,ViewChild } from '@angular/core';
// Selection model
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort'; 
import { OperatorsService } from 'src/services/operators.service';
import { MatFormField } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { ExportService } from 'src/services/export.service';

export interface OperatorElement {
  _id: string; // This alone is not shown in UI. But part of the record.
  position: number;
  name: string;
  joindate: Date;
  phonenumber: number;
}


const ELEMENT_DATA: OperatorElement[]=[{
  "joindate": new Date('2024-07-21'),
  "position": 7,
  "name": "L1",
  "phonenumber": 12345678,
  "_id": "6390978e945c67807f5299cb",

}];

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {
  //selection column added
  displayedColumns: string[] = ['select', 'position','name', 'joindate', 'phonenumber'];
  //deviceSelection = new SelectionModel<OperatorElement>(true, []);
  
  operatorSelection = new SelectionModel<OperatorElement>(true, []);
  operators: OperatorElement[];

  dataSource = new MatTableDataSource<OperatorElement>();
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

  constructor(private operatorService: OperatorsService , public router: Router,private exportService: ExportService) {
    this.dataSource.paginator = this.paginator;
    this.operators = [];
   
   }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.operatorService.get().subscribe(operators => {
      this.operators = operators;
      this.dataSource.data= this.operators;
    });    
  }


  // Table check box selection


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.operatorSelection.selected.length;
    const numRows = this.operators.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear deviceSelection. */
  masterToggle() {
    this.isAllSelected() ?
      this.operatorSelection.clear() :
      this.operators.forEach(row => this.operatorSelection.select(row));
  }  

  delete() {
    // iterated thru the selected devices and delete one by one
    for (let item of this.operatorSelection.selected) {
      console.log(item._id);
      this.operatorService.delete(item._id).subscribe((data) => {
        window.location.reload();
      });
    }
  }

  edit() {
    // `${url}/${id}`
    for (let item of this.operatorSelection.selected) {
      alert("edite device" + item._id);
      this.operatorService.getById(item._id).subscribe((data) => {
        //send the data for the child form
        // this.router.navigateByUrl('devices/device?Id:${item._id}');
        this.router.navigateByUrl('users/operators/operator?Id=' + item._id);
      });
    }

  }


  // End pf tabel check box selection
  exportexcel(): void {
    this.exportService.exportexcel();

  }



  exportpdf() {
    this.exportService.exportpdf();
  }
  copyData2() {
    var dataArray = "";

    this.operators.forEach(row => {
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

  }
}
