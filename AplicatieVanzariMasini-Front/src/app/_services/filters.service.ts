import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Brand } from '../_models/brand';
import { Model } from '../_models/model';
import { ModelVersion } from '../_models/modelVersion';
import { Fuel } from '../_models/fuel';
import { Transmission } from '../_models/transmission';
import { PollutionRule } from '../_models/pollutionRule';
import { Gearbox } from '../_models/gearbox';
import { Country } from '../_models/country';
import { ManufacturingDate } from '../_models/manufacturingDate';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getBrandsForCar() {
    return this.http.get<Brand[]>(this.baseUrl + 'carspecification/getbrands');
  }

  getBodiesForCar() {
    return this.http.get<Body[]>(this.baseUrl + 'carspecification/getbodies');
  }

  getModelsForCar() {
    return this.http.get<Model[]>(this.baseUrl + 'carspecification/getmodels');
  }

  getModelVersionsForCar() {
    return this.http.get<ModelVersion[]>(this.baseUrl + 'carspecification/getmodelversions');
  }

  getFuelsForCar() {
    return this.http.get<Fuel[]>(this.baseUrl + 'carspecification/getfuels');
  }
  
  getTransmissionsForCar() {
    return this.http.get<Transmission[]>(this.baseUrl + 'carspecification/gettransmissions');
  }
  
  getGearboxesForCar() {
    return this.http.get<Gearbox[]>(this.baseUrl + 'carspecification/getgearboxes');
  }
  
  getManufacturingDateForCar() {
    return this.http.get<ManufacturingDate[]>(this.baseUrl + 'carspecification/getmanufacturingdates');
  }


  getPollutionRulesForCar() {
    return this.http.get<PollutionRule[]>(this.baseUrl + 'carspecification/getpollutionrules');
  }

  // getPowersForCar() {
  //   return this.http.get<Power[]>(this.baseUrl + 'carspecification/getpowers');
  // }

  // getCylindricalCapacitiesForCar() {
  //   return this.http.get<CylindricalCapacity[]>(this.baseUrl + 'carspecification/getcylindricalcapacities');
  // }

  getCountriesForCar() {
    return this.http.get<Country[]>(this.baseUrl + 'carspecification/getcountries');
  }

  // getKmsForCar() {
  //   return this.http.get<Km[]>(this.baseUrl + 'carspecification/getkms');
  // }

  // getPricesForCar() {
  //   return this.http.get<Price[]>(this.baseUrl + 'carspecification/getprices');
  // }
}
