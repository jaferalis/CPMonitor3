import { Component, OnInit, VERSION ,ViewChild} from '@angular/core';
import alasql from 'alasql';

import * as XLSX from 'xlsx';
import { jsPDF } from "jspdf";

import html2canvas from 'html2canvas';
import { DevicesService } from 'src/services/devices.service';
import { Router } from '@angular/router';

// Selection model
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ExportService } from 'src/services/export.service';




export interface DeviceElement {
  _id: number; // This alone is not shown in UI. But part of the record.
  date: Date;
  machinename: string;
  machinetype: string;
  description: string;
  operator: string;
  rawqty: number;
  achievedqty: number;
  remarks: string
}

interface value {
  timestamp: string;
  value: string | number | boolean;
  qualitycode?: number;
}

interface PlcData {
  variableId: string;
  values: value[];
  lastRequestTime?: string;
}

interface DataResult {
  data: PlcData[];
  hasMoreData?: {
    from: string;
    to: string;
  }
}

const ELEMENT_DATA: DeviceElement[]=[{
    "date": new Date('2024-07-21'),
    "machinename": "L1",
    "machinetype": "M1",
    "description": "L1 description",
    "operator": "L1 Operator",
    "rawqty": 10,
    "achievedqty": 5,
    "remarks": "Dev5",
    "_id": 1,

}];



@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})




export class DevicesComponent implements OnInit {
  //selection column added
  displayedColumns: string[] = ['select', 'date', '_id','machinetype', 'machinename', 'description', 'operator', 'rawqty', 'achievedqty', 'remarks','delete'];

  devices: DeviceElement[];
  data: DataResult;
  cpuvalue: string = "0";
  writeSpeed: String = "";
  searchword: String =""
  res:any;
  records: Number =0;
  rawqty: number =0
  achievedqty:number=0;
  percent:number = this.achievedqty/this.rawqty * 100;

  dataSource = new MatTableDataSource<DeviceElement>();
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
  // devices: any;
  constructor(private deviceService: DevicesService, public router: Router, private exportService: ExportService) {
    this.dataSource.paginator = this.paginator;
    this.devices = [];
    this.data = {
      "data": [
        {
          "variableId": "3cc0968f69b6460981cf5af36f677cb5",
          "values": [
            {
              "timestamp": "2022-12-03T00:50:04.000Z",
              "value": 0.16680567139282734,
              "qualitycode": 192
            }
          ],
          "lastRequestTime": "2022-12-03T00:50:04.000Z"
        }
      ]
    }
  }



  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.deviceService.getCount().subscribe((data)=>{
        this.records = Number(data.count);
        if (this.records > 0){
          this.deviceService.getDevices().subscribe(devs => {
            this.devices = devs;
            this.dataSource.data= this.devices;
            console.log("DEVS:" + JSON.stringify(devs));
            this.res = alasql('SELECT  SUM(rawqty) AS rawqty, SUM(achievedqty) AS achievedqty FROM ?', [devs]);
            console.log("Result" + JSON.stringify(this.res));
            this.rawqty =this.res[0].rawqty;
            this.achievedqty = this.res[0].achievedqty;
            this.percent = this.achievedqty/this.rawqty * 100;
          });
        }
    })

    // this.deviceService.startCPUDataMonitoring().subscribe((data)=>{

    //   this.data = data;
    // });
    // setTimeout(() => {
    //   this.getData();
    // }, 1000);
  }


  // Table check box selection

  deviceSelection = new SelectionModel<DeviceElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.deviceSelection.selected.length;
    const numRows = this.devices.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear deviceSelection. */
  masterToggle() {
    this.isAllSelected() ?
      this.deviceSelection.clear() :
      this.devices.forEach(row => this.deviceSelection.select(row));
  }

  private selectRow($event: any, devices: DeviceElement[]) {
    // console.log($event.checked);
    if ($event.checked) {
      console.log(devices[0].machinename);
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

    this.devices.forEach(row => {
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



  deleteDevice() {
    // iterated thru the selected devices and delete one by one
    if (window.confirm('Are you sure you want to delete this row?')){
      for (let item of this.deviceSelection.selected) {
        console.log(item._id);
        this.deviceService.deleteDevice(item._id).subscribe((data) => {
          window.location.reload();
        });
      }
    }

  }

  deleteRow(row: any) {
    // const index = this.dataSource.indexOf(row);
    // if (index !== -1) {
    //   this.dataSource.splice(index, 1);
    // }
    if (window.confirm('Are you sure you want to delete this row?')){
      this.deviceService.deleteDevice(row._id).subscribe((data) => {
        window.location.reload();
      });
    }

  }
  
  
  editDevice() {
    // `${url}/${id}`
    
    for (let item of this.deviceSelection.selected) {
      this.deviceService.getById(item._id).subscribe((data) => {
        //send the data for the child form
        // this.router.navigateByUrl('devices/device?Id:${item._id}');
        this.router.navigateByUrl('devices/device?Id=' + item._id);
      });
    }

  }

  onRowClicked(row: DeviceElement) {
    // this.selection.toggle(row);
    // this.deleteDevice();

  }

  searchThis(filter: string){
   // this.dataSource.data.filter()
   this.dataSource.filter = filter;
  }
}
