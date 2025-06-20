import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogFormFields } from '../../Models/DialogFormFields';
import { NgForOf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dialog-form',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    NgForOf,
    MatIconModule
  ],
  templateUrl: './dialog-form.component.html',
  styleUrl: './dialog-form.component.css'
})
export class DialogFormComponent {
  form! : FormGroup

  constructor
  (
    private fb : FormBuilder,
    private dialogRef : MatDialogRef<DialogFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data : {
      title: string;
      confirmText? : string;
      cancelText? : string;
      fields : DialogFormFields[];
      initialValues? : any
    }
  )
  {
    this.form = this.fb.group({});
    this.data.fields.forEach(field => {
      const control = this.fb.control(
        this.data.initialValues?.[field.name] || (field.type === 'checkbox' ? false : ''),
        field.required ? Validators.required : []
      );
      this.form.addControl(field.name, control);
    });
  }
  
  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
