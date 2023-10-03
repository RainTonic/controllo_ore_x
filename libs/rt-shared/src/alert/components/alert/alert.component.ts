import { Component, Input, OnInit } from '@angular/core';
import { Subscription, interval, timeout } from 'rxjs';
import {
  SubscriptionsLifecycle,
  completeSubscriptions,
} from '../../../../../../apps/controllo-ore-x/src/app/utils/subscriptions_lifecycle';
import { AlertService } from '../../services/alert.service';
import { RtAlert } from './alert.interface';

@Component({
  selector: 'lib-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, SubscriptionsLifecycle {
  private readonly _ALERT_TIMEOUT: number = 5000;
  @Input() alert!: RtAlert;

  /**
   * How much time passed since the alert was created.
   */
  private _alertLifetimeElapsed: number = 0;

  /**
   * The total lifetime of the alert.
   */
  private _alertLifetimeTotal: number = this._ALERT_TIMEOUT;

  subscriptionsList: Subscription[] = [];

  _completeSubscriptions: (subscriptionsList: Subscription[]) => void =
    completeSubscriptions;

  currentTimeout: any;
  currentInterval: any;
  isPinned: boolean = false;
  shouldShowDetails: boolean = false;

  constructor(private _rtAlertSvc: AlertService) {}

  ngOnInit(): void {
    this._setSubscriptions();
  }

  ngOnDestroy(): void {
    this._completeSubscriptions(this.subscriptionsList);
  }

  _setSubscriptions(): void {
    this.subscriptionsList.push(this.setTimeout());
    this.subscriptionsList.push(this.setInterval());
  }

  /**
   * Set the timeout for the alert lifetime
   */
  setTimeout(): Subscription {
    return interval(this._ALERT_TIMEOUT)
      .pipe(timeout(this._ALERT_TIMEOUT))
      .subscribe((_) => {
        this.close();
      });
  }

  /**
   * Set the interval for the alert lifetime progress bar
   */
  setInterval(): Subscription {
    return interval(100)
      .pipe()
      .subscribe((_) => {
        this._alertLifetimeElapsed -= 100;
      });
  }

  /**
   * If the alert is pinned, the interval and the timeout are cleared.
   */
  pin(): void {
    this.isPinned = true;
    clearInterval(this.currentInterval);
    clearTimeout(this.currentTimeout);
    this._completeSubscriptions(this.subscriptionsList);
  }

  close(): void {
    clearInterval(this.currentInterval);
    clearTimeout(this.currentTimeout);
    this._rtAlertSvc.removeValue(this.alert.id);
  }

  toggleDetails(): void {
    this.shouldShowDetails = !this.shouldShowDetails;
  }

  getLifetimeProgress(): number {
    return (this._alertLifetimeElapsed / this._alertLifetimeTotal) * 100;
  }
}
