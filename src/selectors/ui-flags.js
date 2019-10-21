import { createSelector } from 'reselect';
export const selectCreatedRole = state => state.createdRole;
export const selectFormError = state => state.formError;
export const selectUi = state => state.ui;
export const selectUserProfile = state => state.userProfile;

export const selectLoading = createSelector(
  selectUi,
  ui => ui.loading
);
export const selectUiDonorId = createSelector(
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
  selectUserDonor,
  donor => donor.name
);

export const selectUserGroup = createSelector(
  selectUserProfile,
  profile => profile.group.name
);
