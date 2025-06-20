import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { DialogData } from '../../Models/DialogData';
import { DialogComponent } from '../../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  async openConfirmation(data: DialogData): Promise<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {
      data,
      width: '350px',
      disableClose: true
    });

    const result = await firstValueFrom(dialogRef.afterClosed());
    return result === true;
  }
}
