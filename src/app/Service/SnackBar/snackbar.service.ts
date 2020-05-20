import { Injectable } from '@angular/core';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  actionButtonLabel = 'x';
  action = true;
  config = new MatSnackBarConfig();
  autoHide = 10000; 

  constructor(private snackBar: MatSnackBar) {
    this.config.duration = this.autoHide;
  }

  open(message: string) { 
    this.snackBar.open(message, this.action && this.actionButtonLabel, this.config);    
  } 
}
