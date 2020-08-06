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
  // @ViewChild(AgmMap, { static: true }) public agmMap: AgmMap;
  // zoom;
  // lat;
  // lng;
  // getAddress;
  // longitude;
  // latitude;
  // currentLocation: string;

  registerMode = false;
  pagination: Pagination;
  public announces: Announce[];
  announce: Announce;

  public cars: Car[];
  car: Car;

  public brands: Brand[];
  public brandsName: string[] = [];

  public bodies: Brand[];
  public bodiesName: string[] = [];

  public models: Model[];
  public modelsName: string[] = [];

  public modelVersions: ModelVersion[];
  public modelVersionsName: string[] = [];

  public pricesValues: string[] = [];
  public kmsValues: string[] = [];
  public enginePowerValues: string[] = [];
  public cylindricalCapacityValues: string[] = [];
  public stateValues: string[] = [];
  public damagedValues: string[] = [];
  public particleFilterValues: string[] = [];
  public rightHandDriveValues: string[] = [];

  public manufacturingDates: ManufacturingDate[];
  public manufacturingDatesValues: string[] = [];

  public fuels: Fuel[];
  public fuelsName: string[] = [];

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
    private authService: AuthService,
    private http: HttpClient,
    private filtersService: FiltersService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private apiloader: MapsAPILoader,
    private announceService: AnnounceService,
    private alertify: AlertifyService
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

    // this.get();
    // this.agmMap.triggerResize(true);
    // this.zoom = 16;
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

  getBrandsNames() {
    this.brands.forEach((brand) => {
      this.brandsName.push(brand.name);
    });
  }

  getModelsForCar() {
    this.route.data.subscribe((data) => {
      this.models = data.models;
      this.getModelsNames();
    });
  }

  getModelsNames() {
    this.models.forEach((model) => {
      this.modelsName.push(model.name);
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
      this.getManufacturingDatesValues();
    });
  }

  getManufacturingDatesValues() {
    this.manufacturingDates.forEach((manufacturingDates) => {
      this.manufacturingDatesValues.push(manufacturingDates.year);
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

  getFuelsNames() {
    this.fuels.forEach((fuel) => {
      this.fuelsName.push(fuel.name);
    });
  }

  public selected(value: any): void {
    console.log("Selected value is: ", value);
  }

  public selectedBrand(value: any): void {
    console.log("Selected value is: ", value);
    this.brandSelected = !this.brandSelected;
  }

  public selectedModel(value: any): void {
    console.log("Selected value is: ", value);
      this.modelSelected = !this.modelSelected;
  }

  public selectedVersion(value: any): void {
    console.log("Selected value is: ", value);
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

  // get() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position: Position) => {
  //       if (position) {
  //         this.lat = position.coords.latitude;
  //         this.lng = position.coords.longitude;
  //         this.getAddress = (this.lat, this.lng);
  //         console.log(position);
  //         this.apiloader.load().then(() => {
  //           let geocoder = new google.maps.Geocoder();
  //           let latlng = {
  //             lat: this.lat,
  //             lng: this.lng,
  //           };
  //           geocoder.geocode(
  //             {
  //               location: latlng,
  //             },
  //             function (results) {
  //               if (results[0]) {
  //                 this.currentLocation = results[0].formatted_address;
  //                 console.log(this.assgin);
  //               } else {
  //                 console.log("Not found");
  //               }
  //             }
  //           );
  //         });
  //       }
  //     });
  //   }
  // }

  // mapClicked($event: MouseEvent) {
  //   (this.latitude = $event.coords.lat), (this.longitude = $event.coords.lng);

  //   this.apiloader.load().then(() => {
  //     let geocoder = new google.maps.Geocoder();
  //     let latlng = { lat: this.latitude, lng: this.longitude };

  //     geocoder.geocode({ location: latlng }, function (results) {
  //       if (results[0]) {
  //         this.currentLocation = results[0].formatted_address;
  //         console.log(this.currentLocation);
  //       } else {
  //         console.log("Not found");
  //       }
  //     });
  //   });
  // }
}
