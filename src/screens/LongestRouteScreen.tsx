import React from 'react';
import { useParams } from 'react-router-dom';
import { Player, PlayerId, PLAYERS } from '../model/player';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { set } from '../store/longestRouteSlice';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export const LongestRouteScreen: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const {playerId} = useParams<{ playerId: PlayerId }>();
  const player = PLAYERS.find(p => p.id === playerId) as Player;

  const selected: boolean = useSelector<RootState, boolean>(s => s.longestRoute[playerId]?.selected || false);

  const handleClick = () => {
    dispatch(set({playerId, selected: !selected}));
  };

  const style = {
    width: '80%',
    height: '200px',
    backgroundColor: selected ? player.bgColor : undefined,
  };

  const variant = selected ? 'contained' : 'outlined';

  return (
    <Box display="flex" justifyContent="center" alignItems="center" style={{height: '100%'}}>
      <Button style={style} variant={variant} onClick={handleClick}>
        <Typography variant="h6">Longest route</Typography>
      </Button>
    </Box>
  )
}