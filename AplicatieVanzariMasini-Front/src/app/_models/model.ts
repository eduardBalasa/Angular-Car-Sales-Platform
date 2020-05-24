import { Car } from './car';

export interface Model {
    id: number;
    name: string;
    modelVersionId: number;
    cars?: Car[];
}