import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ], 
  exports: [
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule
  ]
})
export class MaterialModule { }
