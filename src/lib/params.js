import React from 'react';

import { keys } from 'ramda';
import { USERS_PORTAL_PATH, REPORTS_PATH } from '../constants';

export const PAGE_TITLES_MAP = {
  [USERS_PORTAL_PATH]: 'User Management',
  [REPORTS_PATH]: 'Reports'
};

export function getSubheadingFromParams(pathname) {
  const pathMatch = keys(PAGE_TITLES_MAP).find(path => pathname.includes(path));
  return PAGE_TITLES_MAP[pathMatch];
}
