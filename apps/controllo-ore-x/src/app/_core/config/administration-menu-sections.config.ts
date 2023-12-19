import { ROLE } from '@api-interfaces';
import { IMenuSection } from '@app/_core/interfaces/i-menu-section.interface';

export const ADMINISTRATION_MENU_SECTIONS: IMenuSection[] = [
  {
    label: 'Report',
    routerLink: 'report',
    iconName: 'chair',
    roles: [ROLE.ADMIN],
  },
];
