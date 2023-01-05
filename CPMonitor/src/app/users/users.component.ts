import { Component, OnInit ,ViewChild} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort'; 
import { UsersService, UserElement} from 'src/services/users.service';
import { MatFormField } from '@angular/material/form-field';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  //selection column added
  displayedColumns: string[] = ['select', 'position','name', 'email', 'role'];
  //deviceSelection = new SelectionModel<OperatorElement>(true, []);
  
 userSelection = new SelectionModel<UserElement>(true, []);
 users: UserElement[];

  dataSource = new MatTableDataSource<UserElement>();

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

  constructor(private userService: UsersService , public router: Router) {
    this.dataSource.paginator = this.paginator;
    this.users = [];
   }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.userService.get().subscribe(usrs => {
      this.users = usrs;
      this.dataSource.data= this.users;
    });      
  }

// Table check box selection


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.userSelection.selected.length;
    const numRows = this.users.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear deviceSelection. */
  masterToggle() {
    this.isAllSelected() ?
      this.userSelection.clear() :
      this.users.forEach(row => this.userSelection.select(row));
  }  

  delete() {
    // iterated thru the selected devices and delete one by one
    for (let item of this.userSelection.selected) {
      console.log(item._id);
      this.userService.delete(item._id).subscribe((data) => {
        window.location.reload();
      });
    }
  }

  edit() {
    // `${url}/${id}`
    for (let item of this.userSelection.selected) {
      this.userService.getById(item._id).subscribe((data) => {
        //send the data for the child form
        // this.router.navigateByUrl('devices/device?Id:${item._id}');
        this.router.navigateByUrl('users/user?Id=' + item._id);
      });
    }

  }

  exportexcel(){

  }

  exportpdf(){

  }

  copyData2() {
    var dataArray = "";

    this.users.forEach(row => {
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
