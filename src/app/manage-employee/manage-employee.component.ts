import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employe-list/employee';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})
export class ManageEmployeeComponent implements OnInit {
  public employee = new Employee();
  private employeeList = new Array<Employee>();
  public isFormSubmitted = false;
  public isShow: boolean = false;
  constructor(private router: Router, private activatedroute: ActivatedRoute) { }

  public employeeData: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z ]*$"),
    Validators.maxLength(20)]),
    gender: new FormControl(null, [Validators.required]),
    mobileNumber: new FormControl(null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    address: new FormControl(null, [Validators.required]),
    salary: new FormControl(null, [Validators.required]),
    id: new FormControl(null, [Validators.required]),
  })
  sub;
  id;
  ngOnInit(): void {
    //debugger;
    this.sub = this.activatedroute.queryParamMap.subscribe(params => {
      this.id = +params.get('empId') || 0;
      if (this.id > 0) {
        this.isShow = true;
        var emp = localStorage.getItem('employeeData');
        this.employeeList = JSON.parse(emp);
        let i = this.employeeList.filter((element, index) => {
          return element.id === this.id;
        });
        this.employee = i[0];
        console.log(i, 'seeee');
      }
    })
  }
  //create new employee method
  appendToStorage(name, data) {

    var old = localStorage.getItem(name);
    if (old === null) {
      localStorage.setItem(name, JSON.stringify(data));
    } else {
      old = JSON.parse(old);
      const array3 = [...old, ...data];
      //store new arra3 stored in localStorage
      localStorage.setItem(name, JSON.stringify(array3));
    };
  };
  Submit() {
    console.log(this.employeeData.value);
    this.isFormSubmitted = true;
    if (this.employeeData.valid) {
      var localSto: Array<any> = [this.employeeData.value];
      this.appendToStorage('employeeData', localSto);
      this.employeeData.reset(this.employeeData.value);
      alert('employee record saved');
      this.router.navigate(['/']);
    }
  };
  //update employee
  updateEmployee() {
    this.isFormSubmitted = true;
    debugger
    if (this.employeeData.valid) {
      let i = this.employeeList.findIndex((element, index) => {
        return element.id === this.id;
      });
      this.employeeList.splice(i, 1);
      console.log(this.employeeData.value)
      this.employeeList.push(this.employeeData.value);
      localStorage.clear();
      localStorage.setItem('employeeData', JSON.stringify(this.employeeList));
      alert('employee record updated');
      this.router.navigate(['/']);
    }
  }
  Close() {
    this.router.navigate(['/'])
  }
}
