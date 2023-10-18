import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COX_FILTER } from '@api-interfaces';
import { CoxFilter } from 'libs/utils';
@Component({
  selector: 'controllo-ore-x-report-filter',
  templateUrl: './report-filter.component.html',
  styleUrls: ['./report-filter.component.scss'],
})
export class ReportFilterComponent {
  @Output() filtersEmitter: EventEmitter<CoxFilter[]> = new EventEmitter<
    CoxFilter[]
  >();

  filters: {
    list: any[];
    singleLabel: string;
    multiLabel: string;
    fieldName: COX_FILTER;
    formControl: FormControl;
  }[] = [];

  activeFilters: {
    list: any[];
    singleLabel: string;
    multiLabel: string;
    fieldName: COX_FILTER;
    formControl: FormControl;
  }[] = [];

  areFiltersActive: boolean = false;

  constructor() {
    this.filters.push({
      list: [
        'Extra cheese',
        'Mushroom',
        'Onion',
        'Pepperoni',
        'Sausage',
        'Tomato',
      ],
      singleLabel: 'Cliente',
      multiLabel: 'Clienti',
      fieldName: COX_FILTER.CUSTOMER,
      formControl: new FormControl(),
    });
    this.filters.push({
      list: [
        'Formaggio',
        'Funghi',
        'Cipolla',
        'Peperoni',
        'Salsiccia',
        'Pomodoro',
      ],
      singleLabel: 'Progetto',
      multiLabel: 'Progetti',
      fieldName: COX_FILTER.PROJECT,
      formControl: new FormControl(),
    });
    this.filters.forEach((filter) => {
      this.activeFilters.push({
        list: [],
        singleLabel: filter.singleLabel,
        multiLabel: filter.multiLabel,
        fieldName: filter.fieldName,
        formControl: filter.formControl,
      });
    });
  }

  formEmitter(filter: any, newValue: any[]): void {
    const selectedFilter: CoxFilter = {
      fieldName: filter.fieldName,
      list: newValue,
    };

    //update the active filters
    this.activeFilters.forEach((activeFilter) => {
      if (activeFilter.fieldName == selectedFilter.fieldName) {
        activeFilter.list = selectedFilter.list;
      }
    });

    //update are areFiltersActive
    this.areFiltersActive = false;
    this.activeFilters.forEach((activeFilter) => {
      this.areFiltersActive =
        this.areFiltersActive || !!activeFilter.list.length;
    });
  }

  remove(filter: CoxFilter, element: string): void {
    this.activeFilters.forEach((activeFilter) => {
      if (activeFilter.fieldName == filter.fieldName) {
        const index = filter.list.indexOf(element);
        if (index >= 0) {
          filter.list.splice(index, 1);
          activeFilter.formControl.setValue(filter.list);
        }
      }
    });
  }

  resetFn(): void {
    this.activeFilters.forEach((activeFilter) => {
      activeFilter.list = [];
      activeFilter.formControl.setValue([]);
    });
    this.areFiltersActive = false;
    this.filtersEmitter.emit([]);
  }

  applyFn(): void {
    const selectedFilters: CoxFilter[] = [];
    this.activeFilters.forEach((activeFilter) => {
      if (activeFilter.list.length) {
        selectedFilters.push({
          fieldName: activeFilter.fieldName,
          list: activeFilter.list,
        });
      }
    });

    this.filtersEmitter.emit(selectedFilters);
  }
}
