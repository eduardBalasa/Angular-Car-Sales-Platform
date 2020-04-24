import { Car } from './car';

export interface PollutionRule {
    pollutionRuleId: number;
    name: string;
    cars?: Car[];
}