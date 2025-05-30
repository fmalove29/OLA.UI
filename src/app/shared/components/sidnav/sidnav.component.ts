import { Component } from '@angular/core';
import { AccessMenu } from '../../../models/AccessMenu';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-sidnav',
  imports: [MatIconModule,MatListModule, CommonModule, RouterModule, MatExpansionModule],
  templateUrl: './sidnav.component.html',
  styleUrl: './sidnav.component.css'
})
export class SidnavComponent {
  accessMenus = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      children: [
        { name: 'Overview', icon: 'home', link: 'dashboard/overview' },
        { name: 'Reports', icon: 'bar_chart', link: 'dashboard/reports' }
      ]
    },
    {
      name: 'Settings',
      icon: 'settings',
      children: [
        { name: 'Profile', icon: 'person', link: '/profile' },
        { name: 'Security', icon: 'security', link: '/security' }
      ]
    },
    {
      name : 'Customer',
      icon : 'settings',
      children : [
        { name : 'Customer Enrollment', icon : 'bar_chart', link: '/customer-enrollment'}
      ]
    }
  ];
}
