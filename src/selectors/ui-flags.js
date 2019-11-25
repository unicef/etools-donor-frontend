import { propEq } from 'ramda';
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

export const selectUserDonor = createSelector(
  selectUserProfile,
  profile => profile.donor
);

export const selectUserName = createSelector(
  selectUserProfile,
  profile => profile.username
);

export const selectUserDonorId = createSelector(
  selectUserDonor,
  donor => donor.id
);

export const selectUserGroup = createSelector(
  selectUserProfile,
  profile => profile.group.name
);

export const selectDonorName = createSelector(
  [selectUserDonor, selectParamDonorId, selectDonors, selectUserGroup],
  (userDonor, paramDonorId, donors, userGroup) => {
    if (userDonor.name.length && userGroup !== UNICEF_USER_ROLE) {
      // unicef user profile api returns empty sttring for this property
      return userDonor.name;
    }
    const donor = donors.find(propEq('id', Number(paramDonorId)));
    return (donor && donor.name) || '';
  }
);
