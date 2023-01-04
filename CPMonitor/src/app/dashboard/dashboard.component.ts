import { Component, OnInit } from '@angular/core';
import alasql from 'alasql';
import { DevicesService } from 'src/services/devices.service';
import { machineNameProduction, machineTypeProduction, single } from '../data/data'
import {FormGroup, FormControl} from '@angular/forms';



export interface DeviceElement {
  _id: string; // This alone is not shown in UI. But part of the record.
  date: Date;
  position: number;
  machinename: string;
  machinetype: string;
  description: string;
  operator: string;
  rawqty: number;
  achievedqty: number;
  remarks: string
}

export interface Series {
  name: string;
  value: number
}
export interface MachineTypeGroupGraph {
  name: string;
  series: Series[];
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // formattedDevices = [{'machinename': 'name', 'rawqty':0}];
  // machineCategoryProduction: any[];
  SelectStartDate: Date = new Date();

  SelectEndDate: Date = new Date();
  selectedgroupby:any;
  selectedGroup: string="machinetype"; // This is the selected group from the drop down
  dateStart:string =""; // This is the start date for the graph
  dateEnd:string = ""; // This is the end date for the graph
  range = new FormGroup({
    start: new FormControl(''),
    end: new FormControl(''),
  });
  
  machineTypeProd: MachineTypeGroupGraph[];
  operatorTypeProd: MachineTypeGroupGraph[];
  machineNameProd: MachineTypeGroupGraph[];

  view: number[];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = "MachineType";
  xAxisLabelOperator:string = "Operator";
  xAxisLabelMachineName :string = "Machine Name";
  showYAxisLabel: boolean = true;
  yAxisLabel: string = "Quantity";
  legendTitle: string = 'Quantity';
  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };


  constructor(private deviceService: DevicesService) {
    // Object.assign(this,{ machineTypeProd= })
    this.view = [600, 300];
    this.SelectStartDate.setHours(0, 0, 0, 0);
    this.SelectEndDate.setHours(23, 59, 59, 999);
    //Need to pass the date range and groupby
    this.selectedGroup ="machinetype";
   // this.machineTypeInit();
    this.machineTypeGroup();
    this.machineNameGroup();
    this.operatorTypeGroup();
    this.machineTypeProd = machineTypeProduction;
    this.operatorTypeProd = machineTypeProduction;
    this.machineNameProd = machineTypeProduction
    // ngx-charts bar chart is not refreshing results array so try https://github.com/swimlane/ngx-charts/issues/1097 this.data = [...this.data];
    this.machineTypeProd = [];
    this.machineTypeProd = [...this.machineTypeProd];
    this.machineNameProd = [];
    this.machineNameProd = [...this.machineNameProd];
    this.operatorTypeProd = [];
    this.operatorTypeProd = [...this.operatorTypeProd];
    this.showXAxis = true;
    this.showYAxis = true;
    this.gradient = true;
    this.showLegend = true;
    this.showXAxisLabel = true;
    this.xAxisLabel = "MachineType";
    this.xAxisLabelOperator = "Operator";
    this.xAxisLabelMachineName = "Machine Name";
    this.showYAxisLabel = true;
    this.yAxisLabel = "Quantity";
    this.legendTitle = 'Quantity';
    this.colorScheme = {
      domain: ['#5AA454', '#C7B42C', '#AAAAAA']
    };
    console.log("machineprod:" + JSON.stringify(this.machineTypeProd));

  }

  machineTypeInit(startDate?:string, endDate?:string, groupBy?: string) {
    this.deviceService.getDevices().subscribe(devs => {

      //var res = alasql('SELECT date, machinetype, SUM(rawqty) AS rawqty, SUM(achievedqty) AS achievedqty  FROM ? where (date >= "2022-12-09") AND  (date < "2022-12-10") GROUP BY machinetype', [devs]);
  
    //  var res = alasql('SELECT date, machinetype, SUM(rawqty) AS rawqty, SUM(achievedqty) AS achievedqty  FROM ? where (date >=  "' + startDate + '") AND  (date < "' + endDate + '" ) GROUP BY "'+ groupBy + '"', [devs]);
    console.log("Operator:" + JSON.stringify(devs));
      var str = 'SELECT date, machinetype, SUM(rawqty) AS rawqty, SUM(achievedqty) AS achievedqty  FROM ? where (date >=  "' + this.dateStart + '") AND  (date < "' + this.dateEnd + '" ) GROUP BY  "' + this.selectedGroup + '"';
      console.log("SQL String : " + str);
      var res = alasql('SELECT date, machinetype, operator,machinename, SUM(rawqty) AS rawqty, SUM(achievedqty) AS achievedqty  FROM ? where (date >=  "' + this.dateStart + '") AND  (date < "' + this.dateEnd + '" ) GROUP BY ' + this.selectedGroup + '', [devs]);
      console.log("Response" + JSON.stringify(res));
      this.machineTypeProd =[]; //Empty the array

      res.forEach((element: any) => {
        console.log("element.machinetype:-" + element.operator);
        console.log("element.rawqty:-" + element.rawqty);
        console.log("element.achievedqty:-" + element.achievedqty);

        if (this.selectedGroup == "machinetype"){
          this.xAxisLabel = "Machine Type";
          this.machineTypeProd.push({
            name: element.machinetype,
            series: [{
              name: "RawQuantity",
              value: element.rawqty
            },
            {
              name: "AchievedQuantity",
              value: element.achievedqty
            },]
          });
        }
        else if(this.selectedGroup == "operator"){
          this.xAxisLabel = "Operators";
          this.machineTypeProd.push({
            name: element.operator,
            series: [{
              name: "RawQuantity",
              value: element.rawqty
            },
            {
              name: "AchievedQuantity",
              value: element.achievedqty
            },]
          }); 
        }
        else if (this.selectedGroup == "machinename"){
          this.xAxisLabel = "Machine Name";
          this.machineTypeProd.push({
            name: element.machinename,
            series: [{
              name: "RawQuantity",
              value: element.rawqty
            },
            {
              name: "AchievedQuantity",
              value: element.achievedqty
            },]
          });           
        }


        console.log("Final len" + this.machineTypeProd.length);
        console.log("machinetyeprod Final" + JSON.stringify(this.machineTypeProd));

      });
      // ngx-charts bar chart is not refreshing results array so try https://github.com/swimlane/ngx-charts/issues/1097 this.data = [...this.data];
      this.machineTypeProd = [...this.machineTypeProd];
     

    });
  }

  
  ngOnInit(): void {


  }
  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement){
    console.log("Date Range start" +  dateRangeStart.value);
    console.log("Date Range end" + dateRangeEnd.value);
    var str = JSON.stringify(this.range.value);
    var data = JSON.parse(str);
    this.dateStart = data.start;
    this.dateEnd = data.end;
  //  this.machineTypeInit(this.dateStart, this.dateEnd);
    this.machineTypeGroup();
    this.machineNameGroup();
    this.operatorTypeGroup();
 
  }

  onChangeCategory(event:any){

   this.machineTypeGroup();
   this.machineNameGroup();
   this.operatorTypeGroup();
  }

  machineTypeGroup(){
    this.deviceService.getDevices().subscribe( devs=>{
      var res = alasql('SELECT date, machinetype, operator,machinename, SUM(rawqty) AS rawqty, SUM(achievedqty) AS achievedqty  FROM ? where (date >=  "' + this.SelectStartDate.toISOString() + '") AND  (date <= "' + this.SelectEndDate.toISOString() + '" ) GROUP BY machinetype', [devs]);
      this.machineTypeProd =[]; //Empty the array
      res.forEach((element: any) => {
        this.xAxisLabel = "Machine Type";
        this.machineTypeProd.push({
          name: element.machinetype,
          series: [{
            name: "RawQuantity",
            value: element.rawqty
          },
          {
            name: "AchievedQuantity",
            value: element.achievedqty
          },]
        });        
      });
      // ngx-charts bar chart is not refreshing results array so try https://github.com/swimlane/ngx-charts/issues/1097 this.data = [...this.data];
      this.machineTypeProd = [...this.machineTypeProd];      
    });
    
  }

  operatorTypeGroup(){
    this.deviceService.getDevices().subscribe( devs=>{
      var res = alasql('SELECT date, machinetype, operator,machinename, SUM(rawqty) AS rawqty, SUM(achievedqty) AS achievedqty  FROM ? where (date >=  "' + this.SelectStartDate.toISOString() + '") AND  (date <= "' + this.SelectEndDate.toISOString() + '" ) GROUP BY operator', [devs]);
      this.operatorTypeProd =[]; //Empty the array
      res.forEach((element: any) => {
        this.xAxisLabelOperator = "Operator";
        this.operatorTypeProd.push({
          name: element.operator,
          series: [{
            name: "RawQuantity",
            value: element.rawqty
          },
          {
            name: "AchievedQuantity",
            value: element.achievedqty
          },]
        });        
      });
      // ngx-charts bar chart is not refreshing results array so try https://github.com/swimlane/ngx-charts/issues/1097 this.data = [...this.data];
      this.operatorTypeProd = [...this.operatorTypeProd];
    });
  }

  machineNameGroup(){
    this.deviceService.getDevices().subscribe( devs=>{
      var res = alasql('SELECT date, machinetype, operator,machinename, SUM(rawqty) AS rawqty, SUM(achievedqty) AS achievedqty  FROM ? where (date >=  "' + this.SelectStartDate.toISOString() + '") AND  (date <= "' + this.SelectEndDate.toISOString() + '" ) GROUP BY machinename', [devs]);
      this.machineNameProd =[]; //Empty the array
      res.forEach((element: any) => {
        this.xAxisLabelMachineName = "Machine Name";
        this.machineNameProd.push({
          name: element.machinename,
          series: [{
            name: "RawQuantity",
            value: element.rawqty
          },
          {
            name: "AchievedQuantity",
            value: element.achievedqty
          },]
        });        
      });
      // ngx-charts bar chart is not refreshing results array so try https://github.com/swimlane/ngx-charts/issues/1097 this.data = [...this.data];
      this.machineNameProd = [...this.machineNameProd];      
    });
  }

  onEndDateChange(){
   this.SelectEndDate.setHours(23, 59, 59, 999);
   this.machineTypeGroup();
   this.machineNameGroup();
   this.operatorTypeGroup();
  }

  onStartDateChange(){
    this.SelectEndDate.setHours(0, 0, 0, 0);
    this.machineTypeGroup();
    this.machineNameGroup();
    this.operatorTypeGroup();
  }

}
