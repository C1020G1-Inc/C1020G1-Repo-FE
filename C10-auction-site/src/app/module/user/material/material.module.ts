import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';


@NgModule({
    declarations: [],
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
        BrowserAnimationsModule
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'vi-VN' }
    ],
})
export class MaterialModule {}
