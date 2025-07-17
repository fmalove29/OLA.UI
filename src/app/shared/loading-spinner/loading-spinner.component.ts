import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadspinnerService} from '../service/loadspinner/loadspinner.service';

@Component({
  selector: 'app-loading-spinner',
  imports: [CommonModule, MatProgressSpinnerModule],
  standalone : true,
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css'
})
export class LoadingSpinnerComponent {
  isLoading$ : any; 
  constructor(private LoadspinnerService: LoadspinnerService) {
    this.isLoading$ = this.LoadspinnerService.isLoading$;
  }
}
