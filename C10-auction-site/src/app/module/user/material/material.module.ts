import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRegisDiaComponent } from './mat-regis-dia/mat-regis-dia.component';
import { MatLoadingDiaComponent } from './mat-loading-dia/mat-loading-dia.component';


@NgModule({
    declarations: [MatRegisDiaComponent, MatLoadingDiaComponent],
    imports: [
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        BrowserAnimationsModule
    ],
    exports: [
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatDialogModule
    ],
    entryComponents: [
        MatRegisDiaComponent,
        MatLoadingDiaComponent
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }
    ],
})
export class MaterialModule {}
