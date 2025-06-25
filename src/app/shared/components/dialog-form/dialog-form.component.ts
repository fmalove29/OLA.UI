import { Component, Inject, OnInit, computed, inject, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogFormData, DialogFormFields } from '../../Models/DialogFormFields';
import { NgForOf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { LiveAnnouncer } from '@angular/cdk/a11y';



@Component({
  selector: 'app-dialog-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    NgForOf,
    MatIconModule,
    MatSelectModule, 
    MatAutocompleteModule,
    MatChipsModule,
    FormsModule
  ],
  templateUrl: './dialog-form.component.html',
  styleUrl: './dialog-form.component.css'
})
export class DialogFormComponent implements OnInit {
  form! : FormGroup
  readonly separatorKeyCodes : number[] = [ENTER, COMMA];
  readonly announcer = inject(LiveAnnouncer);
  chipValues: { [key: string]: string[] } = {};
  roleContainer : string = '';
  chipInputs: { [key: string]: FormControl } = {};
  filteredOptions: { [key: string]: string[] } = {};
  optionsMap: { [key: string]: string[] } = {};



  constructor
  (private fb: FormBuilder, public dialogRef : MatDialogRef<DialogFormComponent>, @Inject(MAT_DIALOG_DATA) public data : DialogFormData){}
  ngOnInit(): void {
    const group: { [key: string]: any } = {};

    this.data.fields?.forEach(field => {
      const defaultValue = this.data.initialValues?.[field.name] ?? field.defaultValue ?? (field.type === 'checkbox' ? false : '');
      group[field.name] = [
        { value: defaultValue, disabled: field.disabled ?? false },
        field.required ? Validators.required : []
      ];

      if (field.type === 'chips-autocomplete') {
        // Extract string labels from options
        this.optionsMap[field.name] = field.options?.map(o => o.label) || [];
        this.chipValues[field.name] = [];
        this.chipInputs[field.name] = new FormControl('');
        this.filteredOptions[field.name] = [...this.optionsMap[field.name]];
      
        this.chipInputs[field.name].valueChanges.subscribe((input: string = '') => {
          const lower = input.toLowerCase();
          this.filteredOptions[field.name] = this.optionsMap[field.name].filter(option =>
            option.toLowerCase().includes(lower)
          );
        });
      }
    });
    this.form = this.fb.group(group);
  }

  add(event: MatChipInputEvent, fieldName: string): void {
    const value = (event.value || '').trim();
    if (value && !this.chipValues[fieldName].includes(value)) {
      this.chipValues[fieldName].push(value);
    }
    this.chipInputs[fieldName].setValue('');
  }

  remove(fieldName: string, value: string): void {
    const index = this.chipValues[fieldName].indexOf(value);
    if (index >= 0) {
      this.chipValues[fieldName].splice(index, 1);
      this.announcer.announce(`Removed ${value}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent, fieldName: string): void {
    const value = event.option.viewValue;
    if (!this.chipValues[fieldName].includes(value)) {
      this.chipValues[fieldName].push(value);
    }
    this.roleContainer = this.chipValues[fieldName].join(',');
    this.chipInputs[fieldName].setValue('');
    
    event.option.deselect();
  }

  onSubmit(): void {
    // Safely set the chips (roleContainer) value into the form before checking validity
    if (this.form.contains('role')) {
      this.form.patchValue({ role: this.roleContainer });
    }
  
    if (this.form.valid) {
      const result = this.form.getRawValue();
      console.log('✅ Form is valid. Submitting:', result);
      this.dialogRef.close(result);
    } else {
      console.log('❌ Form is not valid. Reasons:');
      Object.keys(this.form.controls).forEach(key => {
        const control = this.form.get(key);
        if (control && control.invalid) {
          console.log(`- Field "${key}" is invalid due to:`, control.errors);
        }
      });
    }
  }
  
  

  onCancel(): void {
    this.dialogRef.close();
  }
  getChipLabel(fieldName: string, value: any): string {
    const field = this.data.fields?.find(f => f.name === fieldName);
    const match = field?.options?.find(opt => opt.value === value);
    return match?.label ?? value;
  }
  
}
