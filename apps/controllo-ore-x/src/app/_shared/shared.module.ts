import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { RtTableModule } from '@controllo-ore-x/rt-shared';
import { GlobalTopbarComponent } from './components/global-topbar/global-topbar.component';
import { IndexTemplateComponent } from './components/index-template/index-template.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RtHeaderModule } from './modules/rt-header/rt-header.module';
import { SidenavSectionComponent } from './components/sidenav/components/sidenav-section/sidenav-section.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    GlobalTopbarComponent,
    SidenavComponent,
    PageTitleComponent,
    IndexTemplateComponent,
    SidenavSectionComponent,
    DatepickerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatChipsModule,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    RtHeaderModule,
    RtTableModule,
    MatDatepickerModule,
  ],
  exports: [
    GlobalTopbarComponent,
    SidenavComponent,
    PageTitleComponent,
    IndexTemplateComponent,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'it-IT' }],
})
export class SharedModule {}
