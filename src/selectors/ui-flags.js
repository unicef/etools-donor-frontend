import { propEq, propOr } from 'ramda';
import { createSelector } from 'reselect';
import { selectDonors } from './collections';
import { UNICEF_USER_ROLE } from 'lib/constants';

export const selectCreatedRole = state => state.createdRole;
export const selectFormError = state => state.formError;
export const selectUi = state => state.ui;
export const selectUserProfile = state => state.userProfile;

export const selectLoading = createSelector(
  selectUi,
  ui => ui.loading
);
export const selectPageName = createSelector(
  selectUi,
  ui => ui.page
);

export const selectParamDonorId = createSelector(
  selectUi,
  ui => ui.donorId
);

export const selectUserGroup = createSelector(
  selectUserProfile,
  profile => profile.group.name
);

export const selectUserProfileDonor = createSelector(
  selectUserProfile,
  propOr(null, 'donor')
);

export const selectUserDonor = state => state.donor;

export const selectUserName = createSelector(
  selectUserProfile,
  profile => profile.username
);

export const selectUserDonorId = createSelector(
  selectUserDonor,
  donor => donor.id
);

export const selectDonorName = createSelector(
  [selectUserDonor],
  propOr('', 'name')
);

export const selectDonorCode = createSelector(
  selectUserDonor,
  propOr('', 'code')
);

export const selectIsUsGov = createSelector(
  selectUserDonor,
  propOr(false, 'us_gov')
);

export const selectIsAuthorized = createSelector(
  [selectDonorName, selectUserGroup],
  (donorName, group) => Boolean(donorName.length) || group === UNICEF_USER_ROLE
);

//donor_code=N26715
