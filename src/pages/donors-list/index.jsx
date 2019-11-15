import React from 'react';
import DonorsList from './list';
import Authorized from '../Authorized';

export default function DonorsPage() {
  return (
    <Authorized>
      <DonorsList />
    </Authorized>
  );
}
