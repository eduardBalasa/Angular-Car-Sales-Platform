import { Car } from './car';

export interface CylindricalCapacity {
    cylindricalCapacityId: number;
    name: string;
    cars?: Car[];
}