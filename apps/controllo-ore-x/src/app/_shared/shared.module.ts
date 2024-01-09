import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { HasRoleDirective } from '@app/_core/directives/has-role.directive';
import { RtTableModule } from '@controllo-ore-x/rt-shared';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { GlobalTopbarComponent } from './components/global-topbar/global-topbar.component';
import { IndexTemplateComponent } from './components/index-template/index-template.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { RangeDatepickerComponent } from './components/range-datepicker/range-datepicker.component';
import { ReleaseIndexTableComponent } from './components/release-index-table/release-index-table.component';
import { ReportFilterComponent } from './components/report-template/components/report-filter/report-filter.component';
import { ReportSingleFilterComponent } from './components/report-template/components/report-single-filter/report-single-filter.component';
import { ReportTemplateComponent } from './components/report-template/report-template.component';
import { FilterService } from './components/report-template/services/filter.service';
import { SidenavSectionComponent } from './components/sidenav/components/sidenav-section/sidenav-section.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { RtHeaderModule } from './modules/rt-header/rt-header.module';

@NgModule({
  declarations: [
    GlobalTopbarComponent,
    SidenavComponent,
    PageTitleComponent,
    IndexTemplateComponent,
    SidenavSectionComponent,
    ReportTemplateComponent,
    ReportFilterComponent,
    ReportSingleFilterComponent,
    DatepickerComponent,
    RangeDatepickerComponent,
    ReleaseIndexTableComponent,
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
    MatSelectModule,
    HasRoleDirective,
    MatProgressBarModule,
  ],
  exports: [
    GlobalTopbarComponent,
    SidenavComponent,
    PageTitleComponent,
    IndexTemplateComponent,
    ReportTemplateComponent,
    ReleaseIndexTableComponent,
  ],
  providers: [FilterService, { provide: MAT_DATE_LOCALE, useValue: 'it-IT' }],
})
export class SharedModule {}
