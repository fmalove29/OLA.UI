import { Component, OnInit } from '@angular/core';
import { AccessMenu } from '../../../models/AccessMenu';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { AccessService } from '../../../core/services/Access/access.service';

@Component({
  selector: 'app-sidnav',
  imports: [MatIconModule,MatListModule, CommonModule, RouterModule, MatExpansionModule],
  templateUrl: './sidnav.component.html',
  styleUrl: './sidnav.component.css'
})
export class SidnavComponent  implements OnInit{
  groupedAccess: { [module: string]: Set<string> } = {};
  objectKeys = Object.keys;


  constructor(private accessSerice : AccessService){}


  ngOnInit(){
    this.accessSerice.getUserAccess().subscribe((accessList) =>{
      accessList.forEach(access => {
        if (!this.groupedAccess[access.module]) {
          this.groupedAccess[access.module] = new Set();
        }
        access.paths.forEach(path => this.groupedAccess[access.module].add(path));
      })
    })
  }
  // accessMenus = [
  //   {
  //     name: 'Dashboard',
  //     icon: 'dashboard',
  //     children: [
  //       { name: 'Overview', icon: 'home', link: 'dashboard/overview' },
  //       { name: 'Reports', icon: 'bar_chart', link: 'dashboard/reports' }
  //     ]
  //   },
  //   {
  //     name: 'Settings',
  //     icon: 'settings',
  //     children: [
  //       { name: 'Profile', icon: 'person', link: '/profile' },
  //       { name: 'Security', icon: 'security', link: '/security' }
  //     ]
  //   },
  //   {
  //     name : 'Customer',
  //     icon : 'settings',
  //     children : [
  //       { name : 'Customer Enrollment', icon : 'bar_chart', link: '/customer-enrollment'}
  //     ]
  //   }
  // ];

  formatPathName(path: string): string {
    const clean = path.replace(/^\/+/, ''); // remove leading slashes
    return clean
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
