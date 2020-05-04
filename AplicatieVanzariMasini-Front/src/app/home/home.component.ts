import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FiltersService } from "../_services/filters.service";
import { Brand } from "../_models/brand";
import { ActivatedRoute } from "@angular/router";
import { Model } from "../_models/model";
import { Price } from '../_models/price';
import { Km } from '../_models/km';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./home.component.css"],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 3000, noPause: true, showIndicators: true } }
  ]
})
export class HomeComponent implements OnInit {
  registerMode = false;
  public brands: Brand[];
  public brandsName: string[] = [];
  public models: Model[];
  public modelsName: string[] = [];
  public prices: Price[];
  public pricesValues: string[] = [];
  public kms: Km[];
  public kmsValues: string[] = [];
  public value: any = {};
  

  constructor(
    private http: HttpClient,
    private filtersService: FiltersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getBrandsForCar();
    console.log(this.brands);
    this.getModelsForCar();
    console.log(this.models);
    this.getPricesForCar();
    console.log(this.prices);
    this.getKmsForCar();
    console.log(this.kms);

    
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

  getPricesForCar() {
    this.route.data.subscribe((data) => {
      this.prices = data.prices;
      this.getPricesValues();
    });
  }

  getPricesValues() {
    this.prices.forEach((price) => {
      this.pricesValues.push(price.name);
    });
  }

  getKmsForCar() {
    this.route.data.subscribe((data) => {
      this.kms = data.kms;
      this.getKmsValues();
    });
  }

  getKmsValues() {
    this.kms.forEach((kms) => {
      this.kmsValues.push(kms.name);
    });
  }

  public selected(value: any): void {
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
}
