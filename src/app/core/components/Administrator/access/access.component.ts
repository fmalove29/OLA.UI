// access.component.ts

import { Component,  OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Access } from '../../../../models/Administrator/Access';
import { AccessService } from '../../../services/Access/access.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { DialogService } from '../../../../shared/service/dialog/dialog.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogFormComponent } from '../../../../shared/components/dialog-form/dialog-form.component';
import { DialogFormData, DialogFormFields } from '../../../../shared/Models/DialogFormFields';
import { Role, enumToOptions } from '../../../../shared/Models/Enum/Enum';
import { Module } from '../../../../shared/Models/Enum/Enum';
import Swal from 'sweetalert2';





@Component({
  selector: 'app-access',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatDividerModule,
    MatMenuModule,
    MatDialogModule
  ],
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css'] 
})
export class AccessComponent implements OnInit {

  displayedColumns: string[] = ['name', 'path', 'module', 'roles', 'active', 'action'];
  dataSource = new MatTableDataSource<Access>();

  totalItems = 0;
  pageSize = 10;
  currentPage = 1;

  search = '';
  name = '';
  module = '';
  role = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private accessService: AccessService, private dialogService : DialogService, private formDialog : MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.accessService.getAllAccess({
      Name: this.name,
      Module: this.module,
      Role: this.role,
      Page: this.currentPage,
      Limit: this.pageSize,
      Search: this.search
    }).subscribe(response => {
      this.dataSource.data = response.data;
      this.totalItems = response.meta.total;
    });
  }

  

  onSearchChange(): void {
    this.currentPage = 1;
    this.loadData();
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  async openConfirmation()
  {
    this.dialogService.openConfirmation({
      title : 'Are you sure you want to activate?',
    })
    .then((e)=>{
      this.accessService.UpdateAccess();
    })
  }
  

  openAccessDialog() {
    const accessDialog: DialogFormData = {
      title: 'Add Module',
      confirmText: 'Submit',
      cancelText: 'Cancel',
      fields: [
        {
          name: 'moduleName', // renamed from 'name'
          label: 'Name*',
          type: 'text',
          required: true,
          placeholder: 'Enter module name'
        },
        {
          name: 'path',
          label: 'Path*',
          type: 'text',
          required: true,
          placeholder: 'Enter path (e.g. /access)'
        },
        {
          name: 'module',
          label: 'Module',
          type: 'autocomplete',
          options: enumToOptions(Module),
          required : true,
          placeholder: 'Optional module name'
        },
        {
          name: 'role', // renamed from 'name'
          label: 'Roles',
          type: 'chips-autocomplete',
          options: enumToOptions(Role),
          required: false,
          placeholder: 'Enter role'
        },
        {
          name: 'isActive',
          label: 'Active',
          type: 'checkbox',
          defaultValue: true
        }
      ],
      initialValues: {
        isActive: true
      }
    };
    
    this.dialogService.addEditDialog(accessDialog).subscribe(result => {
      if (result) {
        console.log(result.role);
        const AccessRequest : Access = {
          name :result.moduleName,
          module : result.module,
          path : result.path,
          roles : result.role
        }
        this.accessService.addModule(AccessRequest).subscribe({
          next : (response) =>{
            console.log(response);
            if(response)
            {
              Swal.fire({
                title : response.name,
                text : 'New Module Added',
                icon : 'success',
                confirmButtonText: 'OK'
              }).then(()=>{

              })
            }
          },
          error : (err) =>{
            console.error(err);
          }
        })
      } else {
        console.log('Dialog was closed without submitting');
      }
    });
  }
  
  
  
  
  addModule(access : Access)
  {
    console.log(access);
  }
}
