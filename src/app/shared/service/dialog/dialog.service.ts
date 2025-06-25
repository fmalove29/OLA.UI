import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, firstValueFrom } from 'rxjs';
import { DialogData } from '../../Models/DialogData';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { DialogFormData } from '../../Models/DialogFormFields';
import { DialogFormComponent } from '../../components/dialog-form/dialog-form.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  async openConfirmation(data: DialogFormData): Promise<boolean> {
    const dialogRef = this.dialog.open(DialogFormComponent, {
      data,
      width: '350px',
      disableClose: true
    });

    const result = await firstValueFrom(dialogRef.afterClosed());
    return result === true;
  }

  addEditDialog(data: DialogFormData): Observable<any> {
    const dialogRef = this.dialog.open(DialogFormComponent, { // 👈 FIX: use DialogFormComponent
      width: '500px',
      data
    });

    return dialogRef.afterClosed();
  }
}
