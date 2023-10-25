import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COX_FILTER } from '@api-interfaces';
import { ReportPage } from '@app/_shared/classes/report-page.class';
import {
  SubscriptionsLifecycle,
  completeSubscriptions,
} from '@app/utils/subscriptions_lifecycle';
import { RtLoadingService } from 'libs/rt-shared/src/rt-loading/services/rt-loading.service';
import { Subscription } from 'rxjs';
import { FilterService } from './services/filter.service';

/**
 * Template of a report page
 */
@Component({
  selector: 'controllo-ore-x-report-template',
  templateUrl: './report-template.component.html',
  styleUrls: ['./report-template.component.scss'],
})
export class ReportTemplateComponent
  implements OnInit, OnDestroy, SubscriptionsLifecycle
{
  /**
   * Page to be displayed
   */
  @Input() page!: ReportPage<any, any, any>;
  /**
   * If true, the page will have a menu with options
   */
  @Input() hasMenuOptions: boolean = false;

  /**
   * If true, the page will have a calendar
   */
  @Input() hasCalendar: boolean = false;

  /**
   * If true, the page will have a range calendar
   */
  @Input() hasRangeCalendar: boolean = false;

  /**
   * If true, the page will have a button to export the data in csv format
   */
  @Input() hasExportCsv: boolean = true;

  /**
   * The function to be called when the user clicks on the create button
   */
  @Input() createFn?: () => void | Promise<void>;

  /**
   * The function to be called when the user clicks on the edit button
   */
  @Input() editFn?: (entity: any) => void | Promise<void>;

  /**
   * If true, the create button will be hidden
   */
  @Input() shouldHideCreateButton: boolean = false;

  /**
   * If true, the edit button in the table line will be shown
   */
  @Input() isEditAvailable: boolean = false;

  /**
   * The icon of the header button
   */
  @Input() buttonIcon: string = 'Icon';

  /**
   * The text of the header button
   */
  @Input() buttonText: string = 'Button txt';

  data: any[] = [];

  dataForFilters: {
    list: any[];
    singleLabel: string;
    multiLabel: string;
    fieldName: COX_FILTER;
    formControl: FormControl;
  }[] = [];

  selectedRangeDate: {
    start: Date;
    end: Date;
  } = {
    start: new Date(),
    end: new Date(),
  };

  subscriptionsList: Subscription[] = [];

  _completeSubscriptions: (subscriptionsList: Subscription[]) => void =
    completeSubscriptions;

  private _isLoading: boolean = true;
  private _isFirstLoadDone: boolean = false;

  constructor(
    private _loadingService: RtLoadingService,
    private _filterService: FilterService,
  ) {}

  ngOnInit(): void {
    this._setSubscriptions();
  }

  ngOnDestroy(): void {
    this._completeSubscriptions(this.subscriptionsList);
  }

  _setSubscriptions(): void {
    this.subscriptionsList.push(
      this.page.isLoading.subscribe((isLoading) => {
        this._isLoading = isLoading;
        this._setLoadingParameters();
      }),
      this.page.isFirstLoadDone.subscribe((isFirstLoadDone) => {
        this._isFirstLoadDone = isFirstLoadDone;
        this._setLoadingParameters();
      }),
      this._filterService.dataForFiltersObservable.subscribe(
        (dataForFilters) => {
          this.dataForFilters = dataForFilters;
        },
      ),
    );
  }

  convertNumberToHours(number: number): string {
    const hours = Math.floor(number);
    const minutes = Math.round((number - hours) * 60).toString();
    return hours.toString().padStart(2, '0') + ':' + minutes.padStart(2, '0');
  }

  private _setLoadingParameters(): void {
    if (this._isLoading) {
      this._isFirstLoadDone
        ? this._loadingService.showLoading()
        : this._loadingService.showLoadingBlocking();
    } else {
      this._loadingService.hideLoading();
      this._loadingService.hideLoadingBlocking();
    }
  }
}
