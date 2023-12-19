import { ROLE } from '@api-interfaces';

export const ROLE_SEED: any = [
  {
    name: ROLE.ADMIN,
    permissions: {
      description: 'permission1',
      active: true,
    },
    isModifiable: true,
  },
  {
    name: ROLE.COLLABORATOR,
    permissions: {
      description: 'permission1',
      active: false,
    },
    isModifiable: true,
  },
];
