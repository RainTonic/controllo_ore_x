import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ApiPaginatedResponse, ROLE, ReleaseReadDto } from '@api-interfaces';
import { ReleaseDataService } from '@app/_core/services/release.data-service';
import {
  SubscriptionsLifecycle,
  completeSubscriptions,
} from '@app/utils/subscriptions_lifecycle';
import {
  RT_DIALOG_CLOSE_RESULT,
  RtDialogService,
} from '@controllo-ore-x/rt-shared';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ReleaseDialog } from '../../dialogs/release-dialog/release.dialog';

@Component({
  selector: 'controllo-ore-x-release-table',
  templateUrl: './release-table.component.html',
  styleUrls: ['./release-table.component.scss'],
})
export class ReleaseTableComponent
  implements OnInit, OnDestroy, SubscriptionsLifecycle
{
  @Input() projectId!: string;
  @Output() updated: EventEmitter<void> = new EventEmitter<void>();

  isLoading: BehaviorSubject<boolean> = new BehaviorSubject(true);

  releases: ReleaseReadDto[] = [];

  subscriptionsList: Subscription[] = [];

  ROLE: typeof ROLE = ROLE;

  completeSubscriptions: (subscriptionsList: Subscription[]) => void =
    completeSubscriptions;

  constructor(
    private _rtDialogService: RtDialogService,
    protected _releaseDataService: ReleaseDataService,
  ) {}

  ngOnInit(): void {
    if (!this.projectId) {
      throw new Error('projectId is required');
    }
    if (typeof this.projectId !== 'string') {
      throw new Error('projectId must be a string');
    }
    this.setSubscriptions();
  }

  ngOnDestroy(): void {
    this.completeSubscriptions(this.subscriptionsList);
  }

  setSubscriptions(): void {
    this.subscriptionsList.push(this._fetchSetReleases());
  }

  onReleaseUpdated(): void {
    this.subscriptionsList.push(this._fetchSetReleases());
  }

  openCreateReleaseDialog(): void {
    if (!this.projectId) {
      return;
    }
    const dialogConfig = {
      width: '600px',
      maxWidth: '600px',
    };
    this.subscriptionsList.push(
      this._rtDialogService
        .open(ReleaseDialog, {
          width: dialogConfig.width,
          maxWidth: dialogConfig.maxWidth,
          data: {
            projectId: this.projectId,
            transactionStatus: 'create',
          },
        })
        .subscribe((res) => {
          if (res.result === RT_DIALOG_CLOSE_RESULT.CONFIRM) {
            this._fetchSetReleases();
          }
        }),
    );
  }

  private _fetchSetReleases(): Subscription {
    this.isLoading.next(true);
    return this._releaseDataService
      .getMany({
        where: { projectId: this.projectId },
        order: { name: 'DESC' },
      })
      .subscribe({
        next: (releases: ApiPaginatedResponse<ReleaseReadDto>) => {
          this.releases = releases.data;
          this.isLoading.next(false);
          this.updated.emit();
        },
        error: (error: any) => {
          throw new Error(error);
        },
      });
  }
}
