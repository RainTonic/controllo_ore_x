import { Component } from '@angular/core';
import { ROLE } from '@api-interfaces';

@Component({
  selector: 'controllo-ore-x-release-table-header',
  templateUrl: './release-table-header.component.html',
  styleUrls: ['./release-table-header.component.scss'],
})
export class ReleaseTableHeaderComponent {
  ROLE: typeof ROLE = ROLE;
}
