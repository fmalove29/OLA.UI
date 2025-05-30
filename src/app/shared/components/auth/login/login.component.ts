import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy ,Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginRequest } from '../../../../models/request/LoginRequest';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../../../models/response/LoginResponse';
import { AuthService } from '../../../../core/services/auth/authservice.service';
import { RouterModule, Router } from '@angular/router';
import { error } from 'console';
import { MatIconModule } from '@angular/material/icon';




@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService : AuthService, private router : Router) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/overview']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Login failed. Please check your email or password.');
      }
    });
  }
  
}
