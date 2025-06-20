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
import { DialogFormFields } from '../../../../shared/Models/DialogFormFields';




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
[x: string]: any;
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
      message: 'Are you sure you want to delete this?',
      confirmText: 'Yes',
      cancelText: 'No'
    })
    .then((e)=>{
      this.accessService.UpdateAccess();
    })
  }
  

  openAccessDialog() {
    const fields: DialogFormFields[] = [
      { name: 'name', label: 'Name', type: 'text', required: true },
      { name: 'path', label: 'Path', type: 'text', required: true },
      { name: 'module', label: 'Module', type: 'text' },
      { name: 'roles', label: 'Roles', type: 'text' },
      { name: 'active', label: 'Active', type: 'checkbox' }
    ];

    this.formDialog.open(DialogFormComponent, {
      data: {
        title: 'Add Module',
        fields,
        initialValues: {
          name: '',
          path: '',
          module: '',
          roles: '',
          active: true
        }
      },
      width: '400px'
    }).afterClosed().subscribe(result => {
      if (result) {
        console.log('Submitted Form Data:', result);
      }
    });
  }
  addModule(access : Access)
  {
    console.log(access);
  }
}
