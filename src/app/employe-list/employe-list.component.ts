import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from './employee';

@Component({
  selector: 'app-employe-list',
  templateUrl: './employe-list.component.html',
  styleUrls: ['./employe-list.component.css']
})
export class EmployeListComponent implements OnInit {
  public employeeList = new Array<Employee>();
  constructor(private router: Router) { }

  ngOnInit(): void {
    //debugger
    var item = localStorage.getItem('employeeData');
    this.employeeList = JSON.parse(item);
    console.log(this.employeeList);

  }

  CreateEmployee() {
    this.router.navigate(['manage-employee']);
  }
  //update Employee Record
  updateemployee(id) {
    this.router.navigate(['manage-employee'], { queryParams: { empId: id } });
  };
  //delete Employee Record
  DeleteEmployee(id) {
    let i = this.employeeList.findIndex((element, index) => {
      return element.id === id;
    });
    this.employeeList.splice(i, 1);
    localStorage.clear();
    localStorage.setItem('employeeData', JSON.stringify(this.employeeList))
    alert('employee Record is deleted');
  }
}
