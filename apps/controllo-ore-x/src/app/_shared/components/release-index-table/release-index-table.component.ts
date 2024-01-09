import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  ApiResponse,
  FIND_BOOSTED_FN,
  ROLE,
  ReleaseReadDto,
  UserHoursReadDto,
} from '@api-interfaces';
import { UserHoursDataService } from '@app/_core/services/user-hour.data-service';
import { ReleaseDialog } from '@app/modules/auth/modules/project/modules/release/dialogs/release-dialog/release.dialog';
import { convertNumberToHours } from '@app/utils/NumberToHoursConverter';
import {
  SubscriptionsLifecycle,
  completeSubscriptions,
} from '@app/utils/subscriptions_lifecycle';
import {
  RT_DIALOG_CLOSE_RESULT,
  RtDialogService,
} from '@controllo-ore-x/rt-shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'controllo-ore-x-release-index-table',
  templateUrl: './release-index-table.component.html',
  styleUrls: ['./release-index-table.component.scss'],
})
export class ReleaseIndexTableComponent
  implements OnInit, OnDestroy, SubscriptionsLifecycle
{
  @Input() releases: ReleaseReadDto[] = [];
  @Output() onReleaseUpdatedEvent: EventEmitter<void> =
    new EventEmitter<void>();

  releasesBudget: { [releaseId: string]: number } = {};

  subscriptionsList: Subscription[] = [];

  ROLE: typeof ROLE = ROLE;

  completeSubscriptions: (subscriptionsList: Subscription[]) => void =
    completeSubscriptions;

  constructor(
    private _router: Router,
    private _rtDialogService: RtDialogService,
    private _userHoursDataService: UserHoursDataService,
  ) {}

  ngOnInit(): void {
    this.setSubscriptions();
  }

  ngOnDestroy(): void {
    this.completeSubscriptions(this.subscriptionsList);
  }

  setSubscriptions(): void {
    this.subscriptionsList.push(this._getHoursExecuted(this.releases));
  }

  openReleaseReport(release: ReleaseReadDto): void {
    this._router.navigate([this._router.url + '/report/' + release._id]);
  }

  openEditRelease(release: ReleaseReadDto): void {
    const dialogConfig = {
      width: '600px',
      maxWidth: '600px',
    };
    this.subscriptionsList.push(
      this._rtDialogService
        .open(ReleaseDialog, {
          width: dialogConfig.width,
          maxWidth: dialogConfig.maxWidth,
          data: release,
        })
        .subscribe((res) => {
          if (
            res.result === RT_DIALOG_CLOSE_RESULT.CONFIRM ||
            res.result === RT_DIALOG_CLOSE_RESULT.DELETE
          ) {
            this.onReleaseUpdatedEvent.emit();
          }
        }),
    );
  }

  convertNumberToHours(hoursToConvert: number): string {
    return convertNumberToHours(hoursToConvert);
  }

  formatDeadline(deadline: Date): string {
    return new Intl.DateTimeFormat(navigator.language).format(
      new Date(deadline),
    );
  }

  private _getHoursExecuted(releases: ReleaseReadDto[]): Subscription {
    return this._userHoursDataService
      .getMany({
        where: {
          releaseId: {
            _fn: FIND_BOOSTED_FN.STRING_IN,
            args: releases.map((release) => release._id),
          },
        },
      })
      .subscribe({
        next: (userHours: ApiResponse<UserHoursReadDto[]>) => {
          userHours.data.forEach((userHour: UserHoursReadDto) => {
            if (!this.releasesBudget[userHour.releaseId]) {
              this.releasesBudget[userHour.releaseId] = Number(userHour.hours);
            } else {
              const hours: number = this.releasesBudget[userHour.releaseId];
              this.releasesBudget[userHour.releaseId] =
                hours + Number(userHour.hours);
            }
          });
        },
        error: (error: any) => {
          throw new Error(error);
        },
      });
  }
}
