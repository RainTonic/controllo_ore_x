import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  ActivityCreateDto,
  ActivityReadDto,
  ActivityUpdateDto,
  COX_FILTER,
  CustomerReadDto,
  INDEX_CONFIGURATION_KEY,
  ProjectReadDto,
  ReleaseReadDto,
} from '@api-interfaces';
import { CustomerDataService } from '@app/_core/services/customer.data-service';
import { HoursTagDataService } from '@app/_core/services/hours-tag.data-service';
import { IndexConfigurationDataService } from '@app/_core/services/index-configuration.data-service';
import { ProjectDataService } from '@app/_core/services/project.data-service';
import { ReleaseDataService } from '@app/_core/services/release.data-service';
import { ReportDataService } from '@app/_core/services/report.data-service';
import { TeamDataService } from '@app/_core/services/team.data-service';
import { ReportPage } from '@app/_shared/classes/report-page.class';
import { CalendarDateService } from '@app/_shared/components/index-template/services/calendar-date.service';
import { FilterService } from '@app/_shared/components/report-template/services/filter.service';
import { RtLoadingService } from 'libs/rt-shared/src/rt-loading/services/rt-loading.service';
import { DataForFilter } from 'libs/utils';
import { BehaviorSubject, forkJoin } from 'rxjs';

@Component({
  selector: 'controllo-ore-x-report-index',
  templateUrl: './report-index.page.html',
  styleUrls: ['./report-index.page.scss'],
})
export class ReportIndexPage extends ReportPage<
  ActivityReadDto,
  ActivityCreateDto,
  ActivityUpdateDto
> {
  titleIcon: string | null = 'chair';
  title: string = 'Report';
  pageTitle = 'Report';
  buttonIcon = 'chair';
  buttonText = '';
  subTitle: string = 'Totale ore:';
  subTitleHours: number = 0;
  selectedDate: Date = new Date();

  customers: CustomerReadDto[] = [];
  projects: ProjectReadDto[] = [];
  releases: ReleaseReadDto[] = [];

  override isTableTopbarVisible: boolean = false;

  CONFIGURATION_KEY: INDEX_CONFIGURATION_KEY = INDEX_CONFIGURATION_KEY.REPORT;
  isItLoading: boolean = false;
  _isFirstLoadDone: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );
  hasErrors: boolean = false;
  isEditAvailable: boolean = false;

  constructor(
    protected _configurationService: IndexConfigurationDataService,
    protected _dataService: ReportDataService,
    protected _loadingService: RtLoadingService,
    protected _filterService: FilterService,
    protected _calendarDateService: CalendarDateService,

    private _customerDataService: CustomerDataService,
    private _projectDataService: ProjectDataService,
    private _releaseDataService: ReleaseDataService,
    private _teamDataService: TeamDataService,
    private _hoursTagDataService: HoursTagDataService,
  ) {
    super();
  }

  /**
   *
   */
  setFilters(): void {
    this.dataForFilters = [];

    this.subscriptionsList.push(
      forkJoin({
        customers: this._customerDataService.getMany({
          pagination: false,
        }),
        projects: this._projectDataService.getMany({
          pagination: false,
        }),
        releases: this._releaseDataService.getMany({
          pagination: false,
        }),
        tags: this._hoursTagDataService.getMany({
          pagination: false,
        }),
        members: this._teamDataService.getMany({
          pagination: false,
        }),
      }).subscribe((res) => {
        // saved full data to local variables
        this.customers = res.customers.data;
        this.projects = res.projects.data;
        this.releases = res.releases.data;

        // create needed filters with full data as choice
        this.insertNewFilter(
          'Cliente',
          'Clienti',
          COX_FILTER.CUSTOMER,
          res.customers.data,
        );
        this.insertNewFilter(
          'Progetto',
          'Progetti',
          COX_FILTER.PROJECT,
          res.projects.data,
        );
        this.insertNewFilter(
          'Release',
          'Release',
          COX_FILTER.RELEASE,
          res.releases.data,
        );
        this.insertNewFilter(
          'Membro',
          'Membri',
          COX_FILTER.TEAM,
          res.members.data,
        );
        this.insertNewFilter(
          'Etichetta',
          'Etichette',
          COX_FILTER.TAG,
          res.tags.data,
        );

        this._listenForCascadeFilterLogic();
      }),
    );
  }

  /**
   *
   */
  private _listenForCascadeFilterLogic(): void {
    const customerFilter: DataForFilter | undefined = this.dataForFilters.find(
      (f) => f.fieldName === COX_FILTER.CUSTOMER,
    );
    const projectFilter: DataForFilter | undefined = this.dataForFilters.find(
      (f) => f.fieldName === COX_FILTER.PROJECT,
    );
    const releaseFilter: DataForFilter | undefined = this.dataForFilters.find(
      (f) => f.fieldName === COX_FILTER.RELEASE,
    );

    if (!customerFilter || !projectFilter || !releaseFilter) {
      throw new Error('Missing filter');
    }

    const customerFilterFC: FormControl = customerFilter.formControl;
    const projectFilterFC: FormControl = projectFilter.formControl;
    const releaseFilterFC: FormControl = releaseFilter.formControl;

    customerFilterFC.valueChanges.subscribe(
      (selectedCustomers: CustomerReadDto[] | undefined) => {
        // user unselected all choice on customers
        if (!selectedCustomers || !selectedCustomers?.length) {
          projectFilter.list = this.projects;
          releaseFilter.list = this.releases;
        }

        if (Array.isArray(selectedCustomers)) {
          const selectableProjects = this.projects.filter((p) =>
            selectedCustomers.map((sC) => sC._id).includes(p.customerId),
          );
          const selectableReleases = this.releases.filter((r) =>
            selectableProjects.map((sP) => sP._id).includes(r.projectId),
          );
          projectFilter.list = selectableProjects;
          releaseFilter.list = selectableReleases;
        }
        projectFilterFC.reset();
        releaseFilterFC.reset();
      },
    );

    projectFilterFC.valueChanges.subscribe(
      (selectedProject: ProjectReadDto[] | undefined) => {
        // user unselected all choice on projects
        if (!selectedProject || !selectedProject?.length) {
          releaseFilter.list = this.releases;
          return;
        }

        if (Array.isArray(selectedProject)) {
          const selectableReleases = this.releases.filter((r) =>
            selectedProject.map((sP) => sP._id).includes(r.projectId),
          );
          releaseFilter.list = selectableReleases;
        }
        releaseFilterFC.reset();
      },
    );
  }
}
