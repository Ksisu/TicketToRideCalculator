import BottomNavigation from '@material-ui/core/BottomNavigation';
import { BottomNavigationAction } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ClearIcon from '@material-ui/icons/Clear';
import { useDispatch } from 'react-redux';
import { clearAll } from './store/store';

export const AppBottomNavigation: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const parts = location.pathname.split('/');
  const lastPart = parts[parts.length - 1];
  const firstPart = location.pathname.slice(0, -1 * lastPart.length);

  let backLink;
  let nextLink;
  switch (lastPart) {
    case 'routes':
      backLink = '/';
      nextLink = `${firstPart}stations`;
      break;
    case 'stations':
      backLink = `${firstPart}routes`;
      nextLink = `${firstPart}longest-route`;
      break;
    case 'longest-route':
      backLink = `${firstPart}stations`;
      nextLink = '/';
      break;
  }

  const changeHandler = (e: any, v: string) => {
    if (v === 'clear') {
      dispatch(clearAll);
    } else {
      history.push(v);
    }
  }

  const clear = !backLink && !nextLink;

  return (
    <BottomNavigation onChange={changeHandler} showLabels={clear}>
      {clear && <BottomNavigationAction label="Clear" value="clear" icon={<ClearIcon/>}/>}
      {backLink && <BottomNavigationAction label="Back" value={backLink} icon={<NavigateBeforeIcon/>}/>}
      {nextLink && <BottomNavigationAction label="Next" value={nextLink} icon={<NavigateNextIcon/>}/>}
    </BottomNavigation>
  )
}