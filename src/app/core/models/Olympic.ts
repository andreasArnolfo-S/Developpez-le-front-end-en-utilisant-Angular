// TODO: create here a typescript interface for an olympic country
import { Participation } from './Participation';
export interface Olympic {
  country: string;
  numberOfMedals: number;
  participations: Participation[];
}

