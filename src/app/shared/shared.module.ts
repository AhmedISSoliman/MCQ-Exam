import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HttpClient, } from '@angular/common/http';
import { MatrialModule } from '../shared-material/shared-material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatrialModule,
    NgxPaginationModule,
    NgxSpinnerModule.forRoot(),
    ToastrModule.forRoot({
      progressBar: true,
      closeButton: true,
      timeOut: 3000
    }),

    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    MatrialModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    ToastrModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ]
})
export class SharedModule { }
