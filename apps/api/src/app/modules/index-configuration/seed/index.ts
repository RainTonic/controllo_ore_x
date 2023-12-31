import { IConfigSeed } from './interfaces/i-config-seed';
import { CUSTOMER_INDEX_CONFIGURATION_SEED } from './partials/customer-index-configuration.seed';
import { DAYOFF_INDEX_CONFIGURATION_SEED } from './partials/dayoff-index-configuration.seed';
import { HOURSTAG_INDEX_CONFIGURATION_SEED } from './partials/hoursTag-index-configuration.seed';
import { PROJECT_HOURS_INDEX_CONFIGURATION_SEED } from './partials/project-hours-index-configuration.seed';
import { PROJECT_INDEX_CONFIGURATION_SEED } from './partials/project-index-configuration.seed';
import { RELEASE_HOURS_INDEX_CONFIGURATION_SEED } from './partials/release-hours-index-configuration.seed';
import { RELEASE_INDEX_CONFIGURATION_SEED } from './partials/release-index-configuration.seed';
import { REPORT_INDEX_CONFIGURATION_SEED } from './partials/report-index-configuration.seed';
import { TEAM_INDEX_CONFIGURATION_SEED } from './partials/team-index-configuration.seed';
import { TRACKER_INDEX_CONFIGURATION_SEED } from './partials/tracker-index-configuration.seed';

export const INDEX_CONFIGURATION_SEED: IConfigSeed[] = [
  TEAM_INDEX_CONFIGURATION_SEED,
  CUSTOMER_INDEX_CONFIGURATION_SEED,
  PROJECT_INDEX_CONFIGURATION_SEED,
  RELEASE_INDEX_CONFIGURATION_SEED,
  TRACKER_INDEX_CONFIGURATION_SEED,
  REPORT_INDEX_CONFIGURATION_SEED,
  DAYOFF_INDEX_CONFIGURATION_SEED,
  HOURSTAG_INDEX_CONFIGURATION_SEED,
  PROJECT_HOURS_INDEX_CONFIGURATION_SEED,
  RELEASE_HOURS_INDEX_CONFIGURATION_SEED,
];
