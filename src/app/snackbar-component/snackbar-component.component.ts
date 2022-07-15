import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MainComponent } from '../main/main.component';

@Component({
  selector: 'app-snackbar-component',
  templateUrl: './snackbar-component.component.html',
  styleUrls: ['./snackbar-component.component.scss']
})
export class SnackbarComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log("Started snack")
  }
}
