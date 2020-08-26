import { Car } from './car';
import { ModelVersion } from './modelVersion';

export interface Model {
    id: number;
    name: string;
    brandId: number;
    modelVersions?: ModelVersion[];
    cars?: Car[];
}