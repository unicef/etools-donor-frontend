import {
  staticAssets
} from './static';
import {
  metadata
} from './metadata';
import {
  externalGrants
} from './external-grants';
import {
  grants
} from './grants';
import {
  themes
} from './themes';
import {
  offices
} from './offices';
import {
  reports
} from './reports';
import {
  searchReports
} from './search-reports';
import {
  config
} from './config';

export const collectionsReducers = {
  themes,
  grants,
  externalGrants,
  staticAssets,
  metadata,
  config,
  offices,
  reports,
  searchReports
};
