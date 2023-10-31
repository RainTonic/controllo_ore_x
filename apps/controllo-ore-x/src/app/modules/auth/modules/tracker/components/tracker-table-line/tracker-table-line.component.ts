import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  RT_DIALOG_CLOSE_RESULT,
  RtDialogService,
} from '@controllo-ore-x/rt-shared';
import { TrackerDialog } from '../../dialogs/tracker-dialog/tracker.dialog';
import {
  SubscriptionsLifecycle,
  completeSubscriptions,
} from '@app/utils/subscriptions_lifecycle';
import { Subscription } from 'rxjs';
import { UserHoursReadDto } from '@api-interfaces';
import { TrackerDataService } from '@app/_core/services/tracker.data-service';
import { AlertService } from 'libs/rt-shared/src/alert/services/alert.service';

@Component({
  selector: 'controllo-ore-x-tracker-table-line',
  templateUrl: './tracker-table-line.component.html',
  styleUrls: ['./tracker-table-line.component.scss'],
})
export class TrackerTableLineComponent
  implements OnInit, OnDestroy, SubscriptionsLifecycle
{
  @Input() userHour!: UserHoursReadDto;

  @Output() onUserHourUpdatedEvent: EventEmitter<void> =
    new EventEmitter<void>();

  isLoading: boolean = false;
  hasErrors: boolean = false;
  errorMessage: string = '';

  subscriptionsList: Subscription[] = [];

  completeSubscriptions: (subscriptionsList: Subscription[]) => void =
    completeSubscriptions;

  constructor(
    private _rtDialogService: RtDialogService,
    private _trackerDataService: TrackerDataService,
    private _alertService: AlertService,
  ) {}

  ngOnInit(): void {
    this.setSubscriptions();
  }

  ngOnDestroy(): void {
    this.completeSubscriptions(this.subscriptionsList);
  }

  setSubscriptions(): void {
    this.subscriptionsList.push();
  }

  convertNumberToHours(number: number): string {
    const hours = Math.floor(number);
    const minutes = Math.round((number - hours) * 60).toString();
    return hours.toString().padStart(2, '0') + ':' + minutes.padStart(2, '0');
  }

  openEditUserHourDialog(): void {
    if (!this.userHour) {
      return;
    }

    const dialogConfig = {
      width: '600px',
      maxWidth: '600px',
    };
    const userHour: UserHoursReadDto = this.userHour;

    this.subscriptionsList.push(
      this._rtDialogService
        .open(TrackerDialog, {
          width: dialogConfig.width,
          maxWidth: dialogConfig.maxWidth,
          data: {
            userHour,
            transactionStatus: 'update',
          },
        })
        .subscribe((res) => {
          if (res.result === RT_DIALOG_CLOSE_RESULT.CONFIRM) {
            this.onUserHourUpdatedEvent.emit();
          }
        }),
    );
  }

  duplicateFn(): void {
    if (!this.userHour) {
      return;
    }

    const dialogConfig = {
      width: '600px',
      maxWidth: '600px',
    };
    const userHour: UserHoursReadDto = this.userHour;

    this.subscriptionsList.push(
      this._rtDialogService
        .open(TrackerDialog, {
          width: dialogConfig.width,
          maxWidth: dialogConfig.maxWidth,
          data: {
            userHour,
            transactionStatus: 'duplicate',
          },
        })
        .subscribe((res) => {
          if (res.result === RT_DIALOG_CLOSE_RESULT.CONFIRM) {
            this.onUserHourUpdatedEvent.emit();
          }
        }),
    );
  }

  deleteFn(): void {
    if (!this.userHour) {
      return;
    }
    this._onDelete();
  }

  private _onDelete(): void {
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
        error: (error: any) => {
          throw new Error(error);
        },
      });
  }

  private _delete(): void {
    if (!this.userHour) {
      return;
    }

    const userHourId: string = this.userHour._id;

    this.isLoading = true;
    this.hasErrors = false;
    this._trackerDataService.delete(userHourId).subscribe({
      next: () => {
        this._alertService.openSuccess();
        this.onUserHourUpdatedEvent.emit();
      },
      error: () => {
        this._alertService.openError();
        this.errorMessage = "Non è stato possibile eliminare l'attività";
        this.hasErrors = true;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
