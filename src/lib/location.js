import { useLocation } from 'react-router';
import { donorIdFromLocation } from './helpers';

export const useDonorRoute = () => {
  const location = useLocation();
  const donorIdRoute = donorIdFromLocation(location);

  return {
    donorIdRoute
  };
};
