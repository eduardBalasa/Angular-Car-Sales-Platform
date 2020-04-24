import { Car } from './car';

export interface Model {
    modelId: number;
    name: string;
    modelVersionId: number;
    cars?: Car[];
}