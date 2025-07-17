import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { SidenavService } from '../../service/sidenav/sidenav.service';
import { SidnavComponent } from "../sidnav/sidnav.component";
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth/authservice.service';
import { Router } from '@angular/router';
import { LoadingSpinnerComponent } from "../../loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-layout',
  imports: [NavbarComponent, MatSidenavModule, SidnavComponent, RouterModule, LoadingSpinnerComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  private sub!: Subscription;

  constructor(private sidenavService: SidenavService, private authService : AuthService, private router : Router)
  {
    this.authService.isLoggedIn$.subscribe(isLoggedIn =>{
      if(!isLoggedIn)
      {
        this.router.navigate(['/login']);
      }
    })
  }
  ngOnInit() {
    this.sub = this.sidenavService.sidenavOpen$.subscribe(open => {
      if (open) {
        this.sidenav.open();
      } else {
        this.sidenav.close();
      }
    });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
