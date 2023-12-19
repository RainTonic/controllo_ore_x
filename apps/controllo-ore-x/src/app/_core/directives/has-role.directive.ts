import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ROLE, UserReadDto } from '@api-interfaces';
import { AuthService } from '@app/_core/services/auth.service';

@Directive({
  selector: '[appHasRole]',
  standalone: true,
})
export class HasRoleDirective implements OnInit {
  private _roleAsked?: ROLE;
  private _authUser?: UserReadDto;
  private _roleUser?: ROLE;

  constructor(
    private _authSvc: AuthService,
    private _templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef,
  ) {}

  @Input()
  set appHasRole(value: ROLE | undefined) {
    this._roleAsked = value;
  }

  ngOnInit(): void {
    if (!this._authSvc.loggedInUser) {
      return;
    }
    this._roleUser = this._authSvc.loggedInUser!.role!.name;
    this._authUser = this._authSvc.loggedInUser;
    this._isAuthorized();
  }

  private _updateView(allowed: boolean = false): void {
    // before updating view always clear container, or we will always add one new ViewRef every true check
    this._viewContainer.clear();

    if (allowed) {
      this._viewContainer.createEmbeddedView(this._templateRef);
    }
  }

  private _isAuthorized(): void {
    if (!this._authUser || !this._roleUser) {
      this._updateView(false);
      return;
    }
    if (this._checkRole(this._roleUser)) {
      this._updateView(true);
    } else {
      this._updateView(false);
    }
  }

  private _checkRole(roleUser: ROLE): boolean {
    return roleUser === this._roleAsked;
  }
}
