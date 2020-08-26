import { Car } from './car';
import { NgModel } from '@angular/forms';

export interface ModelVersion {
    id: number;
    name: string;
    modelId: number;
    cars?: Car[];
}