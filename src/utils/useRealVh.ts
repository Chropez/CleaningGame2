import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateRealViewHeightUnit,
  selectRealVhUnit
} from 'routes/application/application-duck';
import { AppThunkDispatch } from 'store';

type Hook = () => number;

const useRealVh: Hook = () => {
  let dispatch: AppThunkDispatch = useDispatch();
  let currentRealViewHeightUnit = useSelector(selectRealVhUnit);

  useEffect(() => {
    function updateVhUnit() {
      let vhUnit = window.innerHeight * 0.01;
      dispatch(updateRealViewHeightUnit(vhUnit));
      document.documentElement.style.setProperty('--vh', `${vhUnit}px`);
    }

    updateVhUnit();
    window.addEventListener('resize', updateVhUnit);
    return () => window.removeEventListener('resize', updateVhUnit);
  }, [dispatch]);

  return currentRealViewHeightUnit;
};

export default useRealVh;
