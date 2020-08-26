import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Car } from "../_models/car";
import { Model } from '../_models/model';
import { ModelVersion } from '../_models/modelVersion';

@Injectable({
  providedIn: "root",
})
export class CarService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCar(id): Observable<Car> {
    return this.http.get<Car>(this.baseUrl + "cars/" + id);
  }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.baseUrl + "cars/getcars");
  }

  getBrandModels( brandId: number): Observable<Model[]> {
    return this.http.get<Model[]>(this.baseUrl + "cars/getmodelsforbrand/" + brandId);
  }

  GetModelVersions(modelId: number): Observable<ModelVersion[]> {
    return this.http.get<ModelVersion[]>(this.baseUrl + "cars/getversionsformodel/" + modelId);
  }
}
