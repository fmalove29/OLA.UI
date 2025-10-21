import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { SelectedUserRolesService } from '../../../../../shared/service/lookups/selected-user-roles.service';
import { ActivatedRoute } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { Module } from '../../../../../shared/Models/Enum/Enum';
import { PermissionService } from '../../../../services/Permission/permission.service';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-dialog',
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatSelectModule],
  templateUrl: './profile-dialog.component.html',
  styleUrl: './profile-dialog.component.css',
})
export class ProfileDialogComponent implements OnInit {
  userRoles : string [] = [];
  modules = Object.values(Module);
  profileForm : FormGroup;
  accountId!: string;

  constructor(
    private permission : PermissionService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data : {AppUserId : string},
    private role : SelectedUserRolesService,
    private dialogRef: MatDialogRef<ProfileDialogComponent>
    )
  {
    this.profileForm= this.fb.group({
      'Role' : ['', Validators.required],
      'Modules' : ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.accountId = this.data.AppUserId
  
    this.role.getSelectedUserRole(this.accountId).subscribe({
      next : (res)=>{
        this.userRoles = res;
        console.log(this.userRoles);
      }
    })
  }

  


  onSubmit() {
    if (this.profileForm.valid) {
      


      const formValues = this.profileForm.value;

      const permissionRequest = {
        AppUserId  : this.accountId,
        Modules : formValues.Modules,
        Role : formValues.Role
      }
      
      this.permission.addPermission(permissionRequest).subscribe({
        next : (e)=>{
          if(e)
            {
              Swal.fire({
                title : permissionRequest.Modules,
                text : 'Permission Added',
                icon : 'success',
                confirmButtonText: 'OK'
              }).then(()=>{
                this.dialogRef.close();
              })
            }
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: err?.error.message || 'Failed to add permission. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      })

    } else {
      // Mark all fields as touched so errors show up
      this.profileForm.markAllAsTouched();
    }
  }
  
}
