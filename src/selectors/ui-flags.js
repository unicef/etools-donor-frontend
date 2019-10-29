import { propEq } from 'ramda';
import { createSelector } from 'reselect';
import { selectDonors } from './collections';

export const selectCreatedRole = state => state.createdRole;
export const selectFormError = state => state.formError;
export const selectUi = state => state.ui;
export const selectUserProfile = state => state.userProfile;

export const selectLoading = createSelector(
  selectUi,
  ui => ui.loading
);

export const selectParamDonorId = createSelector(
  selectUi,
  ui => ui.donorId
);

export const selectUserDonor = createSelector(
  selectUserProfile,
  profile => profile.donor
);

export const selectUserDonorId = createSelector(
  selectUserDonor,
  donor => donor.id
);

export const selectDonorName = createSelector(
  [selectUserDonor, selectParamDonorId, selectDonors],
  (userDonor, paramDonorId, donors) => {
    if (userDonor.name.length) {
      // unicef user profile api returns empty sttring for this property
      return userDonor.name;
    }
    const donor = donors.find(propEq('id', Number(paramDonorId)));
    return (donor && donor.name) || '';
  }
);

export const selectUserGroup = createSelector(
  selectUserProfile,
  profile => profile.group.name
);
