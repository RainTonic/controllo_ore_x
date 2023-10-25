import { Directive, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  COX_FILTER,
  FIND_BOOSTED_FN,
  FindBoostedWhereOption,
  INDEX_CONFIGURATION_KEY,
  TableConfiguration,
} from '@api-interfaces';
import { IndexConfigurationDataService } from '@app/_core/services/index-configuration.data-service';
import {
  SubscriptionsLifecycle,
  completeSubscriptions,
} from '@app/utils/subscriptions_lifecycle';
import {
  BaseDataService,
  RtTableApiStatusManager,
} from '@controllo-ore-x/rt-shared';
import { endOfDay, startOfDay } from 'date-fns';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CalendarDateService } from '../components/index-template/servicies/calendar-date.service';
import { FilterService } from '../components/report-template/services/filter.service';

/**
 * It's a helper class to manage the index pages
 */
@Directive()
export abstract class ReportPage<T, CreateT, UpdateT>
  implements OnInit, OnDestroy, SubscriptionsLifecycle
{
  subscriptionsList: Subscription[] = [];
  isFirstLoadDone: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject(true);

  isTableTopbarVisible: boolean = true;
  isTableHeaderVisible: boolean = true;
  isCompletePage: boolean = true;

  configuration!: TableConfiguration;
  indexTableHandler!: RtTableApiStatusManager<T, CreateT, UpdateT>;

  dataForFilters: {
    list: any[];
    singleLabel: string;
    multiLabel: string;
    fieldName: COX_FILTER;
    formControl: FormControl;
  }[] = [];

  _completeSubscriptions: (subscriptionsList: Subscription[]) => void =
    completeSubscriptions;

  abstract title: string;
  abstract subTitle: string;
  abstract subTitleHours: number;

  abstract CONFIGURATION_KEY: INDEX_CONFIGURATION_KEY;
  protected abstract _dataService: BaseDataService<T, CreateT, UpdateT>;
  protected abstract _configurationService: IndexConfigurationDataService;
  protected abstract _filterService: FilterService;
  protected abstract _calendarDateService: CalendarDateService;
  selectedRangeDate: any;

  ngOnInit(): void {
    this.indexTableHandler = new RtTableApiStatusManager<T, CreateT, UpdateT>(
      this._dataService,
    );
    if (!this.indexTableHandler) {
      throw new Error('Ititialization of indexTableHandler failed');
    }

    this._setSubscriptions();

    // this._load();
  }

  ngOnDestroy(): void {
    this._completeSubscriptions(this.subscriptionsList);
  }

  _setSubscriptions(): void {
    this.subscriptionsList.push(
      this._firstLoad(),
      this.indexTableHandler.isLoading.subscribe((r) => {
        this.isFirstLoadDone.next(true);
        this.isLoading.next(r);
        this.changeSubTitleHours();
      }),
      this._calendarDateService.currentRangeDatesObservable.subscribe(
        (dates: { start: Date; end: Date }) => {
          this.selectedRangeDate = dates;
          this.changeDataForDate();
        },
      ),
    );
  }

  changeSubTitleHours(): void {
    this.subTitleHours = 0;
    this.indexTableHandler.data.forEach((data: any) => {
      this.subTitleHours += parseFloat(data.hours);
    });
  }

  changeDataForDate(): void {
    if (
      !this.indexTableHandler.status ||
      !this.indexTableHandler.tableConfiguration
    ) {
      return;
    }
    if (
      !this.indexTableHandler.status.where &&
      this.indexTableHandler.tableConfiguration
    ) {
      const newWhereOption: FindBoostedWhereOption = {
        date: {
          _fn: FIND_BOOSTED_FN.DATE_BETWEEN,
          args: [
            startOfDay(this.selectedRangeDate.start).toISOString(),
            endOfDay(this.selectedRangeDate.end).toISOString(),
          ],
        },
      };
      this.indexTableHandler.status.where = [newWhereOption];
      this.indexTableHandler.statusChange(this.indexTableHandler.status);
      return;
    }
    const previousWhereOption = this.indexTableHandler.status.where[0];

    const newWhereOption: FindBoostedWhereOption = {
      ...previousWhereOption,
      date: {
        _fn: FIND_BOOSTED_FN.DATE_BETWEEN,
        args: [
          startOfDay(this.selectedRangeDate.start).toISOString(),
          endOfDay(this.selectedRangeDate.end).toISOString(),
        ],
      },
    };

    this.indexTableHandler.status.where = [newWhereOption];
    this.indexTableHandler.statusChange(this.indexTableHandler.status);
  }

  changeDataForFilters(): void {
    this._filterService.changeDataForFilters(this.dataForFilters);
  }

  updateFulltextSearch(fulltextSearch: string): void {
    this.indexTableHandler.status.fulltextSearch = fulltextSearch;
    this.indexTableHandler.statusChange(this.indexTableHandler.status);
  }

  onFilterEmit(filters: FindBoostedWhereOption[]): void {
    this.indexTableHandler.status.where = filters;
    this.changeDataForDate();
    this.indexTableHandler.statusChange(this.indexTableHandler.status);
  }

  insertNewFilter(
    singleLabel: string,
    multiLabel: string,
    fieldName: COX_FILTER,
    list: any[],
  ): void {
    this.dataForFilters.push({
      list: list,
      singleLabel: singleLabel,
      multiLabel: multiLabel,
      fieldName: fieldName,
      formControl: new FormControl(),
    });
  }

  private _load(): Subscription {
    return this._configurationService
      .getConfiguration(this.CONFIGURATION_KEY)
      .subscribe((data) => {
        this.configuration = data.configuration;
        this.indexTableHandler.tableConfiguration = this.configuration;
        this.changeDataForDate();
        this._dataService
          .getMany({
            relations: this.indexTableHandler.tableConfiguration.relations,
          })
          .subscribe((apiResult) => {
            this.indexTableHandler.data = apiResult.data;
            this.setFilters();
            this.changeDataForFilters();
          });
        this.isFirstLoadDone.next(true);
      });
  }

  private _firstLoad(): Subscription {
    return this._configurationService
      .getConfiguration(this.CONFIGURATION_KEY)
      .subscribe((data) => {
        this.configuration = data.configuration;
        this.indexTableHandler.tableConfiguration = this.configuration;
        // this.indexTableHandler.fetchData();

        this._dataService
          .getMany({
            relations: this.indexTableHandler.tableConfiguration.relations,
          })
          .subscribe((apiResult) => {
            this.indexTableHandler.data = apiResult.data;
            this.setFilters();
            this.changeDataForFilters();
            this.changeDataForDate();
          });
        this.isFirstLoadDone.next(true);
      });
  }

  abstract setFilters(): void;
}
