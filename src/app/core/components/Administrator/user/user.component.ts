import { Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AccountService } from '../../../services/account/account.service';
import { Account, AccountParams } from '../../../../models/Account/Account';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router} from '@angular/router'; 
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-user',
  imports: [MatButtonModule, MatIconModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule,CommonModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
  
})
export class UserComponent  implements OnInit{
  
  displayedColumns: string[] = ['firstName', 'lastName', 'middleName', 'email', 'userName'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'actions', 'expand'];
  expandedElement: Account | null = null;

  
  dataSource = new MatTableDataSource<Account>();
  totalItems = 0;
  pageSize = 5;
  currentPage = 1;



  firstName = '';
  lastName = '';
  email = '';
  userName = '';
  search ='';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private accountService : AccountService, private router : Router)
  {

  }

  ngOnInit(): void {
    this.loadAccount();
  }

  loadAccount(): void {
    const AccountParams : AccountParams = {
      firstName : this.firstName,
      lastName : this.lastName,
      userName : this.userName,
      search : this.search,
      email : this.email,
      // total : this.totalItems,
      
      page : this.currentPage,
      limit : this.pageSize
    }
    

    this.accountService.getAccounts(AccountParams).subscribe(response => {
      console.log(response);
      this.dataSource.data = response.data;
      this.totalItems = response.meta.total;
    })  
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.loadAccount();
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadAccount();
  }

  applyFilter(event: Event)
  {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  isExpanded(element: Account) {
    return this.expandedElement === element;
  }

  /** Toggles the expanded state of an element. */
  toggle(element: Account) {
    this.expandedElement = this.isExpanded(element) ? null : element;
  }
  
  editUser(user : Account)
  {
    this.router.navigate(['/account/profile', user.id])
    return user.id;
  }
  
  deleteUser(user: Account)
  {
    return user;
  }

  accountProfile()
  {
    
  }
}