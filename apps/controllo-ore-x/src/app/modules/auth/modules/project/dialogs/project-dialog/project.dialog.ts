import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ApiPaginatedResponse,
  CustomerReadDto,
  ProjectReadDto,
} from '@api-interfaces';
import { CustomerDataService } from '@app/_core/services/customer.data-service';
import { ProjectDataService } from '@app/_core/services/project.data-service';
import {
  SubscriptionsLifecycle,
  completeSubscriptions,
} from '@app/utils/subscriptions_lifecycle';
import {
  IRtDialogClose,
  IRtDialogInput,
  RT_DIALOG_CLOSE_RESULT,
  RtDialogService,
} from '@controllo-ore-x/rt-shared';
import { ProjectColor } from 'apps/controllo-ore-x/src/assets/utils/datas/project-color';
import { AlertService } from 'libs/rt-shared/src/alert/services/alert.service';
import { RT_FORM_ERRORS, RtFormError } from 'libs/utils';
import { Subscription } from 'rxjs';
import { CustomerDialog } from '../../../customer/dialogs/customer-dialog/customer.dialog';

@Component({
  selector: 'controllo-ore-x-project-dialog',
  templateUrl: './project.dialog.html',
  styleUrls: ['./project.dialog.scss'],
})
export class ProjectDialog
  implements SubscriptionsLifecycle, OnDestroy, OnInit
{
  title: string = 'Crea nuovo progetto';
  transactionStatus: 'create' | 'update' = 'create';
  RT_FORM_ERRORS: { [key: string]: RtFormError } = RT_FORM_ERRORS;

  isLoading: boolean = false;
  hasErrors: boolean = false;

  project?: ProjectReadDto;

  projectFormGroup: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    customer: new FormControl(null, Validators.required),
    color: new FormControl(null, Validators.required),
    hoursBudget: new FormControl(null, Validators.required),
    deadline: new FormControl(null, Validators.required),
  });

  projectCustomers: CustomerReadDto[] = [];
  colors: string[] = [...ProjectColor];

  subscriptionsList: Subscription[] = [];

  completeSubscriptions: (subscriptionsList: Subscription[]) => void =
    completeSubscriptions;

  constructor(
    private _projectDataService: ProjectDataService,
    public dialogRef: MatDialogRef<ProjectDialog>,
    private _alertService: AlertService,
    @Inject(MAT_DIALOG_DATA)
    public data: IRtDialogInput<any>,
    private _rtDialogService: RtDialogService,

    private _customerDataService: CustomerDataService,
  ) {
    if (this.data.input) {
      this.transactionStatus = 'update';
      this.title = 'Modifica progetto';
      this.project = this.data.input;
      this.projectFormGroup.patchValue(this.data.input);
    }
  }

  ngOnInit(): void {
    this.setSubscriptions();

    // if (this.data.input) {
    //   this.formHelper.patchForm(this.data.input);
    //   this.userSelectedColor = this.data.input.color;
    //   if (this.data.input.isDuplication) {
    //     this.title = 'Duplica progetto';
    //     return;
    //   }
    //   this.transactionStatus = 'update';
    //   this.formHelper.entityId = this.data.input._id;
    //   this.title = 'Modifica progetto';
    // }
  }

  ngOnDestroy(): void {
    this.completeSubscriptions(this.subscriptionsList);
  }

  setSubscriptions(): void {
    this.subscriptionsList.push(this._fetchSetProjectCustomers());
  }

  onDelete(): void {
    this._rtDialogService
      .openConfirmation(
        "Procedere con l'eliminazione?",
        "L'operazione non è reversibile",
      )
      .subscribe({
        next: (res) => {
          if (res?.result === RT_DIALOG_CLOSE_RESULT.CONFIRM) {
            this._delete();
          }
        },
      });
  }

  onCancel(): void {
    const modalRes: IRtDialogClose = {
      result: RT_DIALOG_CLOSE_RESULT.CANCEL,
    };
    this.dialogRef.close(modalRes);
  }

  onSubmit(): void {
    this.hasErrors = false;

    if (this.transactionStatus === 'update') {
      this._update();
      return;
    }

    this._create();
  }

  getFormControlError(field: string, error: Error): boolean {
    return this.projectFormGroup.controls[field].hasError(error.name);
  }

  compareCustomerFn(x: CustomerReadDto, y: CustomerReadDto): boolean {
    return x?._id === y?._id;
  }

  compareColorFn(x: string, y: string): boolean {
    return x === y;
  }

  // override onSubmit(): void {
  //   if (this.transactionStatus === 'update' && this.data.input.isDuplication) {
  //     this.transactionStatus = 'create';
  //   }
  //   super.onSubmit();
  // }

  openCreateCustomerDialog(): void {
    const dialogConfig = {
      width: '600px',
      maxWidth: '600px',
    };
    this.subscriptionsList.push(
      this._rtDialogService
        .open(CustomerDialog, {
          width: dialogConfig.width,
          maxWidth: dialogConfig.maxWidth,
        })
        .subscribe((res) => {
          if (res.result === RT_DIALOG_CLOSE_RESULT.CONFIRM) {
            this.setSubscriptions();
          }
        }),
    );
  }

  private _create(): void {
    const projectDto: ProjectReadDto = this.projectFormGroup.getRawValue();

    this.isLoading = true;
    this.hasErrors = false;
    this._projectDataService.create(projectDto).subscribe({
      next: () => {
        this._alertService.openSuccess();
        const modalRes: IRtDialogClose = {
          result: RT_DIALOG_CLOSE_RESULT.CONFIRM,
        };
        this.dialogRef.close(modalRes);
      },
      error: () => {
        this.hasErrors = true;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  private _update(): void {
    if (!this.project || this.transactionStatus === 'create') {
      return;
    }

    const projectId: string = this.project._id;
    const projectDto: ProjectReadDto = this.projectFormGroup.getRawValue();

    this.isLoading = true;
    this.hasErrors = false;
    this._projectDataService.update(projectId, projectDto).subscribe({
      next: () => {
        this._alertService.openSuccess();
        const modalRes: IRtDialogClose = {
          result: RT_DIALOG_CLOSE_RESULT.CONFIRM,
        };
        this.dialogRef.close(modalRes);
      },
      error: () => {
        this.hasErrors = true;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  private _delete(): void {
    if (!this.project) {
      return;
    }

    const projectId: string = this.project._id;

    this.isLoading = true;
    this.hasErrors = false;
    this._projectDataService.delete(projectId).subscribe({
      next: () => {
        this._alertService.openSuccess();
        const modalRes: IRtDialogClose = {
          result: RT_DIALOG_CLOSE_RESULT.CONFIRM,
        };
        this.dialogRef.close(modalRes);
      },
      error: () => {
        this.hasErrors = true;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  /**
   * Fetch and set the project's customers.
   */
  private _fetchSetProjectCustomers(): Subscription {
    return this._customerDataService
      .getMany({})
      .subscribe((customers: ApiPaginatedResponse<CustomerReadDto>) => {
        this.projectCustomers = customers.data;
      });
  }
}
