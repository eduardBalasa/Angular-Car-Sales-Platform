import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FiltersService } from "../_services/filters.service";
import { Brand } from "../_models/brand";
import { ActivatedRoute, Router } from "@angular/router";
import { Model } from "../_models/model";
import { CarouselConfig } from "ngx-bootstrap/carousel";
import { ManufacturingDate } from "../_models/manufacturingDate";
import { Fuel } from "../_models/fuel";
import { ModelVersion } from "../_models/modelVersion";
import { Car } from "../_models/car";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { AddAnnounceModalComponent } from "../announce/add-announce-modal/add-announce-modal.component";
import { Body } from "../_models/body";
import { Announce } from "../_models/announce";
import { Country } from "../_models/country";
import { AgmMap, MouseEvent, MapsAPILoader } from "@agm/core";
import { Transmission } from "../_models/transmission";
import { Gearbox } from "../_models/gearbox";
import { PollutionRule } from "../_models/pollutionRule";
import { AuthService } from "../_services/auth.service";
import { AlertifyService } from "../_services/alertify.service";
import { Pagination, PaginatedResult } from "src/app/_models/pagination";
import { AnnounceService } from "../_services/announce.service";
import { CarService } from "../_services/car.service";
import { FormControl } from "@angular/forms";
import { watch } from "fs";

declare const L: any;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./home.component.css"],
  providers: [
    {
      provide: CarouselConfig,
      useValue: { interval: 7000, noPause: true },
    },
  ],
})
export class HomeComponent implements OnInit {
  registerMode = false;
  pagination: Pagination;
  brandControl: FormControl = new FormControl();
  modelControl: FormControl = new FormControl();
  versionControl: FormControl = new FormControl();
  manufacturingDateControl: FormControl = new FormControl();
  fuelControl: FormControl = new FormControl();
  priceControl: FormControl = new FormControl();
  kmControl: FormControl = new FormControl();
  public announces: Announce[];
  announce: Announce;

  public cars: Car[];
  car: Car;

  public brands: Brand[];
  public brandsName: any[] = [];

  public bodies: Brand[];
  public bodiesName: string[] = [];

  public models: Model[];
  public modelsName: any[] = [];

  public modelVersions: ModelVersion[];
  public modelVersionsName: string[] = [];

  public minPrice: any[] = [];
  public maxPrice: any[] = [];
  public minKm: any[] = [];
  public maxKm: any[] = [];
  public enginePowerValues: string[] = [];
  public cylindricalCapacityValues: string[] = [];
  public stateValues: string[] = [];
  public damagedValues: string[] = [];
  public particleFilterValues: string[] = [];
  public rightHandDriveValues: string[] = [];

  public manufacturingDates: ManufacturingDate[];
  public minManufacturingDate: any[] = [];
  public maxManufacturingDate: any[] = [];

  public fuels: Fuel[];
  public fuelsName: any[] = [];

  public countries: Country[];
  public countriesName: string[] = [];

  brandSelected: boolean = false;
  modelSelected: boolean = false;
  public gearboxes: Gearbox[];
  public gearboxesNames: string[] = [];

  public pollutionRules: PollutionRule[];
  public pollutionRulesNames: string[] = [];

  public transmissions: Transmission[];
  public transmissionsNames: string[] = [];

  public value: any = {};
  bsModalRef: BsModalRef;
  announceParams: any = {};

  constructor(
    public authService: AuthService,
    private http: HttpClient,
    private filtersService: FiltersService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private apiloader: MapsAPILoader,
    private announceService: AnnounceService,
    private alertify: AlertifyService,
    private carService: CarService
  ) {}

  ngOnInit() {
    this.getAnnounces();
    console.log(this.announces);
    this.getCars();
    console.log(this.cars);
    this.getBrandsForCar();
    console.log(this.brands);
    this.getModelsForCar();
    console.log(this.models);
    this.getModelVerisionsForCar();
    console.log(this.modelVersions);
    this.getManufacturingDatesForCar();
    console.log(this.manufacturingDates);
    this.getBodiesForCar();
    console.log(this.bodies);
    this.getFuelsForCar();
    console.log(this.fuels);
    this.getCountriesForCar();
    console.log(this.countries);
    this.getGearboxesForCar();
    console.log(this.gearboxes);
    this.getPollutionRulesForCar();
    console.log(this.pollutionRules);
    this.getTransmissionsForCar();
    console.log(this.transmissions);

    if (!navigator.geolocation) {
      console.log("location is not supported");
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
      let mymap = L.map("mapid").setView(latLong, 13);
      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZWJsczIyIiwiYSI6ImNrZTl2NDl1djA2ajkyc3Qwc2R2amxucDIifQ.FAFzrPSdhDuXQ4ZXEXrUZg",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: "your.mapbox.access.token",
        }
      ).addTo(mymap);

      let marker = L.marker(latLong).addTo(mymap);
      marker.bindPopup('<b>Te afli aici</b>').openPopup();
    });

    this.watchPosition();
  }

  watchPosition() {
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition(
      (position) => {
        console.log(
          `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
        );
        if (position.coords.latitude === desLat) {
          navigator.geolocation.clearWatch(id);
        }
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 0,
      }
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  announceModal(
    brands: Brand,
    models: Model,
    modelVersions: ModelVersion,
    manufacturingDates: ManufacturingDate,
    fuels: Fuel,
    bodies: Body,
    countries: Country,
    transmissions: Transmission,
    gearboxes: Gearbox,
    pollutionRules: PollutionRule
  ) {
    const initialState = {
      brands,
      models,
      modelVersions,
      manufacturingDates,
      fuels,
      bodies,
      countries,
      transmissions,
      gearboxes,
      pollutionRules,
    };
    this.bsModalRef = this.modalService.show(AddAnnounceModalComponent, {
      initialState,
    });
    this.bsModalRef.content.closeBtnName = "Close";
  }

  getAnnounces() {
    this.route.data.subscribe((data) => {
      this.announces = data["announces"].result;
      this.pagination = data["announces"].pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadAnnounces();
  }

  loadAnnounces() {
    this.announceService
      .getAnnounces(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe(
        (res: PaginatedResult<Announce[]>) => {
          this.announces = res.result;
          this.pagination = res.pagination;
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

  getCars() {
    this.route.data.subscribe((data) => {
      this.cars = data.cars;
    });
  }

  getCountriesForCar() {
    this.route.data.subscribe((data) => {
      this.countries = data.countries;
      this.getCountriesNames();
    });
  }

  getCountriesNames() {
    this.countries.forEach((country) => {
      this.countriesName.push(country.name);
    });
  }

  getGearboxesForCar() {
    this.route.data.subscribe((data) => {
      this.gearboxes = data.gearboxes;
      this.getGearboxesNames();
    });
  }

  getGearboxesNames() {
    this.gearboxes.forEach((gearbox) => {
      this.gearboxesNames.push(gearbox.name);
    });
  }

  getPollutionRulesForCar() {
    this.route.data.subscribe((data) => {
      this.pollutionRules = data.pollutionRules;
      this.getPollutionRullesNames();
    });
  }

  getPollutionRullesNames() {
    this.pollutionRules.forEach((pollutionRule) => {
      this.pollutionRulesNames.push(pollutionRule.name);
    });
  }

  getTransmissionsForCar() {
    this.route.data.subscribe((data) => {
      this.transmissions = data.transmissions;
      this.getTransmissionsNames();
    });
  }

  getTransmissionsNames() {
    this.transmissions.forEach((transmission) => {
      this.transmissionsNames.push(transmission.name);
    });
  }

  getBrandsForCar() {
    this.route.data.subscribe((data) => {
      this.brands = data.brands;
      this.getBrandsNames();
    });
  }

  getBrandsNames(): any {
    this.brands.forEach((brand) => {
      this.brandsName.push({
        id: brand.id,
        text: brand.name,
      });
    });
  }

  getModelsForCar() {
    this.route.data.subscribe((data) => {
      this.models = data.models;
      this.getModelsNames();
    });
  }

  getModelsNames(): any {
    this.models.forEach((model) => {
      this.modelsName.push({
        id: model.id,
        text: model.name,
      });
    });
  }

  getModelVerionsNames() {
    this.modelVersions.forEach((modelVersion) => {
      this.modelVersionsName.push(modelVersion.name);
    });
  }

  getModelVerisionsForCar() {
    this.route.data.subscribe((data) => {
      this.modelVersions = data.modelVersions;
      this.getModelVerionsNames();
    });
  }

  getManufacturingDatesForCar() {
    this.route.data.subscribe((data) => {
      this.manufacturingDates = data.manufacturingDates;
      this.getMinManufacturingDates();
      this.getMaxManufacturingDates();
    });
  }

  getMinManufacturingDates(): any {
    this.manufacturingDates.forEach((manDate) => {
      this.minManufacturingDate.push({
        id: manDate.id,
        text: manDate.year,
      });
    });
  }

  getMaxManufacturingDates(): any {
    this.manufacturingDates.forEach((manDate) => {
      this.maxManufacturingDate.push({
        id: manDate.id,
        text: manDate.year,
      });
    });
  }

  getBodiesForCar() {
    this.route.data.subscribe((data) => {
      this.bodies = data.bodies;
      this.getBodiesNames();
    });
  }

  getBodiesNames() {
    this.bodies.forEach((body) => {
      this.bodiesName.push(body.name);
    });
  }

  getFuelsForCar() {
    this.route.data.subscribe((data) => {
      this.fuels = data.fuels;
      this.getFuelsNames();
    });
  }

  getFuelsNames(): any {
    this.fuels.forEach((fuel) => {
      this.fuelsName.push({
        id: fuel.id,
        text: fuel.name,
      });
    });
  }
  // getFuelsNames() {
  //   this.fuels.forEach((fuel) => {
  //     this.fuelsName.push(fuel.name);
  //   });
  // }

  public selected(value: any): void {
    console.log("Selected value is: ", value);
  }

  public selectedBrand(value: any): void {
    console.log("Selected value is: ", value);
    this.carService.getBrandModels(value.id).subscribe(
      (data) => {
        this.models = data;
        console.log("Models:", this.models);
        this.modelsName = [];
        this.getModelsNames();
        console.log("Model Names:", this.modelsName);
      },
      (error) => {
        this.alertify.error(error);
      }
    );
    this.modelControl.reset();
    this.versionControl.reset();
    if (!this.brandSelected) {
      this.brandSelected = !this.brandSelected;
    }
    this.announceParams.brand = value.text;
    this.announceParams.model = "undefined";
    this.announceParams.ModelVersion = "undefined";
    this.announceParams.all = true;
    this.searchAnnounces();
  }

  public selectedModel(value: any): void {
    console.log("Selected value is: ", value);
    this.carService.GetModelVersions(value.id).subscribe(
      (data) => {
        this.modelVersions = data;
        console.log("Models:", this.models);
        this.modelVersionsName = [];
        this.getModelVerionsNames();
        console.log("Model Names:", this.modelsName);
      },
      (error) => {
        this.alertify.error(error);
      }
    );
    this.versionControl.reset();
    if (!this.modelSelected) {
      this.modelSelected = !this.modelSelected;
    }
    this.announceParams.model = value.text;
    this.announceParams.ModelVersion = "undefined";
    this.announceParams.all = true;
    this.searchAnnounces();
  }

  public selectedVersion(value: any): void {
    console.log("Selected value is: ", value);
    this.announceParams.ModelVersion = value.text;
    this.announceParams.all = true;
    this.searchAnnounces();
  }

  public selectedFuel(value: any): void {
    console.log("Selected value is: ", value);
    this.announceParams.Fuel = value.text;
    this.announceParams.all = true;
    this.searchAnnounces();
  }

  public selectedMinManufacturingDate(value: any): void {
    console.log("Selected value is: ", value);
    this.announceParams.MinManufacturingDate = value.text;
    this.announceParams.all = true;
    this.searchAnnounces();
  }

  public selectedMaxManufacturingDate(value: any): void {
    console.log("Selected value is: ", value);
    this.announceParams.MaxManufacturingDate = value.text;
    this.announceParams.all = true;
    this.searchAnnounces();
  }

  public selectedMinKm(value: any): void {
    console.log("Selected value is: ", value);
    this.announceParams.MinKm = value;
    this.announceParams.all = true;
    this.searchAnnounces();
  }

  public selectedMaxKm(value: any): void {
    console.log("Selected value is: ", value);
    this.announceParams.MaxKm = value;
    this.announceParams.all = true;
    this.searchAnnounces();
  }

  public selectedMinPrice(value: any): void {
    console.log("Selected value is: ", value);
    this.announceParams.MinPrice = value;
    this.announceParams.all = true;
    this.searchAnnounces();
  }

  public selectedMaxPrice(value: any): void {
    console.log("Selected value is: ", value);
    this.announceParams.MaxPrice = value;
    this.announceParams.all = true;
    this.searchAnnounces();
  }

  public removed(value: any): void {
    console.log("Removed value is: ", value);
  }

  public typed(value: any): void {
    console.log("New search input: ", value);
  }

  public refreshValue(value: any): void {
    this.value = value;
  }

  registerToggle() {
    this.registerMode = true;
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }

  searchAnnounces() {
    this.announceService.getAnnounces(1, 15, this.announceParams).subscribe(
      (data) => {
        this.announces = data.result;
        this.pagination = data.pagination;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  resetFilters() {
    this.brandControl.reset();
    this.modelControl.reset();
    this.versionControl.reset();
    this.fuelControl.reset();
    this.manufacturingDateControl.reset();
    this.kmControl.reset();
    this.priceControl.reset();
    this.announceParams = {};
    this.announceParams.all = true;
    this.searchAnnounces();
  }
}
