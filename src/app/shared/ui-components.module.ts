import { NgModule } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UiViewHeaderComponent } from '../components/ui-view-header/ui-view-header.component';
import { PostComponent } from '../components/post/post.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UiViewHeaderComponent,
    PostComponent
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatDividerModule,
    MatSnackBarModule,
    MatDialogModule,
    NgFor,
    NgIf,
    MatTabsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    FormsModule,
    UiViewHeaderComponent,
    PostComponent
  ]
})
export class UiComponentsModule { }
