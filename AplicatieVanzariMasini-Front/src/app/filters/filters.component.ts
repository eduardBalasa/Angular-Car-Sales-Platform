import { Component, OnInit } from '@angular/core';
import { FiltersService } from '../_services/filters.service';
import { Car } from '../_models/car';
import { Brand } from '../_models/brand';
import { Model } from '../_models/model';
import { ModelVersion } from '../_models/modelVersion';
import { Fuel } from '../_models/fuel';
import { Transmission } from '../_models/transmission';
import { Gearbox } from '../_models/gearbox';
import { PollutionRule } from '../_models/pollutionRule';
import { Country } from '../_models/country';
import { ManufacturingDate } from '../_models/manufacturingDate';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})

export class FiltersComponent implements OnInit {
  brands: Brand[];
  bodies: Body[];
  models: Model[];
  modelVersions: ModelVersion[];
  fuels: Fuel[];
  transmissions: Transmission[];
  manufacturingDates: ManufacturingDate[];
  gearboxes: Gearbox[];
  pollutionrules: PollutionRule[];
  countries: Country[];

  constructor(private filtersService: FiltersService) { }

  ngOnInit() {
    this.getBrandsForCar();
    this.getBodiesForCar();
    this.getModelsForCar();
    this.getModelVersionsForCar();
    this.getFuelsForCar();
    this.getTransmissionsForCar();
    this.getManufacturingDatesForCar();
    this.getGearboxesForCar();
    // this.getPowersForCar();
    // this.getCylindricalCapacitiesForCar();
    this.getCountriesForCar();
  
  }

  getBrandsForCar() {
    this.filtersService.getBrandsForCar().subscribe((brands: Brand[]) => {
      this.brands = brands;
      console.log(brands);
    }, error => {
      console.log(error);
    });
  }

  getBodiesForCar() {
    this.filtersService.getBodiesForCar().subscribe((bodies: Body[]) => {
      this.bodies = bodies;
      console.log(bodies);
    }, error => {
      console.log(error);
    });
  }

  getModelsForCar() {
    this.filtersService.getModelsForCar().subscribe((models: Model[]) => {
      this.models = models;
      console.log(models);
    }, error => {
      console.log(error);
    });
  }

  getModelVersionsForCar() {
    this.filtersService.getModelVersionsForCar().subscribe((modelVersions: ModelVersion[]) => {
      this.modelVersions = modelVersions;
      console.log(modelVersions);
    }, error => {
      console.log(error);
    });
  }

  getFuelsForCar() {
    this.filtersService.getFuelsForCar().subscribe((fuels: Fuel[]) => {
      this.fuels = fuels;
      console.log(fuels);
    }, error => {
      console.log(error);
    });
  }

  getTransmissionsForCar() {
    this.filtersService.getTransmissionsForCar().subscribe((transmissions: Transmission[]) => {
      this.transmissions = transmissions;
      console.log(transmissions);
    }, error => {
      console.log(error);
    });
  }

  getManufacturingDatesForCar() {
    this.filtersService.getManufacturingDateForCar().subscribe((manufacturingDates: ManufacturingDate[]) => {
      this.manufacturingDates = manufacturingDates;
      console.log(manufacturingDates);
    }, error => {
      console.log(error);
    });
  }

  getGearboxesForCar() {
    this.filtersService.getGearboxesForCar().subscribe((gearboxes: Gearbox[]) => {
      this.gearboxes = gearboxes;
      console.log(gearboxes);
    }, error => {
      console.log(error);
    });
  }

  getCountriesForCar() {
    this.filtersService.getCountriesForCar().subscribe((countries: Country[]) => {
      this.countries = countries;
      console.log(countries);
    }, error => {
      console.log(error);
    });
  }

}
