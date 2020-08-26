import { Car } from './car';
import { Model } from './model';

export interface Brand {
    id: number;
    name: string;
    models?: Model[];
    cars?: Car[];
}