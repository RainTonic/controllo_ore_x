import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { HasRoleDirective } from '@app/_core/directives/has-role.directive';
import {
  RtDialogModule,
  RtInputModule,
  RtLoadingModule,
  RtSelectModule,
  RtTableModule,
} from '@controllo-ore-x/rt-shared';
import { SharedModule } from '@shared/shared.module';
import { ProjectActivityCardComponent } from './components/project-activity-card/project-activity-card.component';
import { ProjectInfoComponent } from './components/project-info/project-info.component';
import { ProjectReleaseStatusDataComponent } from './components/project-release-status-data/project-release-status-data.component';
import { ProjectReleaseStatusComponent } from './components/project-release-status/project-release-status.component';
import { ProjectStatusInfoComponent } from './components/project-status-info/project-status-info.component';
import { ReleaseStatusDataHoursTagTableHeaderComponent } from './components/release-status-data-hours-tag-table-header/release-status-data-hours-tag-table-header.component';
import { ReleaseStatusDataHoursTagTableLineComponent } from './components/release-status-data-hours-tag-table-line/release-status-data-hours-tag-table-line.component';
import { ReleaseStatusDataHoursTagComponent } from './components/release-status-data-hours-tag/release-status-data-hours-tag.component';
import { ReleaseStatusDataComponent } from './components/release-status-data/release-status-data.component';
import { ReleaseStatusInfoComponent } from './components/release-status-info/release-status-info.component';
import { ReleaseTableLineComponent } from './components/release-table-line/release-table-line.component';
import { ReleaseTableComponent } from './components/release-table/release-table.component';
import { ReleaseDialog } from './dialogs/release-dialog/release.dialog';
import { ReleaseIndexPage } from './pages/release-index/release-index.page';
import { ReportIndexPage } from './pages/report-index/report-index.page';
import { ReleaseRoutingModule } from './release-routing.module';

@NgModule({
  declarations: [
    ReleaseIndexPage,
    ReleaseTableComponent,
    ProjectReleaseStatusComponent,
    ReleaseTableLineComponent,
    ReportIndexPage,
    ReleaseDialog,
    ProjectActivityCardComponent,
    ProjectReleaseStatusDataComponent,
    ReleaseStatusDataComponent,
    ReleaseStatusDataHoursTagComponent,
    ReleaseStatusDataHoursTagTableHeaderComponent,
    ReleaseStatusDataHoursTagTableLineComponent,
    ReleaseStatusInfoComponent,
    ProjectStatusInfoComponent,
    ProjectInfoComponent,
  ],
  imports: [
    CommonModule,
    ReleaseRoutingModule,
    MatChipsModule,
    SharedModule,
    MatIconModule,
    MatMenuModule,
    RtTableModule,
    MatFormFieldModule,
    MatSelectModule,
    RtDialogModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    RtInputModule,
    RtLoadingModule,
    RtSelectModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    HasRoleDirective,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'it-IT' }],
})
export class ReleaseModule {}
