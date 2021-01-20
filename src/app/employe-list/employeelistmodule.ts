import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeListComponent } from './employe-list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

const routes: Routes = [
    {
        path: '', component: EmployeListComponent
    },
    {
        path:'manage-employee', loadChildren:()=>import('../manage-employee/employeemodule').then(obj=>obj.ManageEmployeeModule)
    }

]
@NgModule({
    declarations: [EmployeListComponent],
    imports: [CommonModule,FormsModule,MatIconModule,RouterModule.forChild(routes)],
    exports:[EmployeListComponent]
})
export class EmployeeModule { }
