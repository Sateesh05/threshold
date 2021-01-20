import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ManageEmployeeComponent } from './manage-employee.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '', component: ManageEmployeeComponent
    }

]
@NgModule({
    declarations: [ManageEmployeeComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)],
    //exports:[LoginComponent]
})
export class ManageEmployeeModule { }
