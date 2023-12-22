import { ROLE } from '@api-interfaces';
import { IMenuSection } from '@app/_core/interfaces/i-menu-section.interface';

export const MANAGEMENT_MENU_SECTIONS: IMenuSection[] = [
  {
    label: 'Progetti',
    routerLink: 'progetti',
    iconName: 'egg',
  },
  {
    label: 'Clienti',
    routerLink: 'clienti',
    iconName: 'bakery_dining',
    roles: [ROLE.ADMIN],
  },
  {
    label: 'Team',
    routerLink: 'team',
    iconName: 'workspaces',
    roles: [ROLE.ADMIN],
  },
  {
    label: 'Etichette',
    routerLink: 'etichette',
    iconName: 'sports_tennis',
    roles: [ROLE.ADMIN],
  },
];
