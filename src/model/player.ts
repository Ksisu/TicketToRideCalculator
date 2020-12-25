import { Property } from 'csstype';
import { blue, green, grey, red, yellow } from '@material-ui/core/colors';

export type PlayerId = 'red' | 'blue' | 'yellow' | 'green' | 'black';

export interface Player {
  id: PlayerId;
  name: string;
  mainColor: Property.Color;
  bgColor: Property.Color;
}

export const PLAYERS = [
  {id: 'red', name: 'Red', mainColor: red[500], bgColor: red[50]},
  {id: 'blue', name: 'Blue', mainColor: blue[500], bgColor: blue[50]},
  {id: 'yellow', name: 'Yellow', mainColor: yellow[700], bgColor: yellow[50]},
  {id: 'green', name: 'Green', mainColor: green[500], bgColor: green[50]},
  {id: 'black', name: 'Black', mainColor: grey[500], bgColor: grey[200]},
] as Player[];

