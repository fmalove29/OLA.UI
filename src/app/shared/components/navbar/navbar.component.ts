import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavService } from '../../service/sidenav/sidenav.service';
import { AuthService } from '../../../core/services/auth/authservice.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  standalone : true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor( private sidnavService : SidenavService, private authService :AuthService)
  {

  }

  onMenuClick()
  {
    this.sidnavService.toggle();
  }
  onLogout()
  {
    this.authService.logout();
  }
}
