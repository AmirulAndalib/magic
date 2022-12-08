
/*
 * Copyright (c) Aista Ltd, 2021 - 2022 info@aista.com, all rights reserved.
 */

import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pwa-update-dialog',
  templateUrl: './pwa-update-dialog.component.html'
})
export class PwaUpdateDialogComponent {

  constructor(
    private swUpdate: SwUpdate,
    private dialogRef: MatDialogRef<PwaUpdateDialogComponent>,
    private matDialog: MatDialog) { }

  public reloadPage(): void {
    this.swUpdate.activateUpdate().then(() => {
      this.dialogRef.close();
      window.location.href = window.location.href;
    });
  }

  public remindLater() {
    this.dialogRef.close();
    setTimeout(() => {
      this.matDialog.open(PwaUpdateDialogComponent, {
        position: {top: '7px'},
        width: '500px',
        panelClass: ['pwa-update-panel'],
        hasBackdrop: false
      })
    }, 120000);
  }
}
