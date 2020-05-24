import { Car } from './car';

export interface PollutionRule {
    id: number;
    name: string;
    cars?: Car[];
}