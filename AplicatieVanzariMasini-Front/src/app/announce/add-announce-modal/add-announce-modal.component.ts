import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap";
import { Brand } from "../../_models/brand";
import { HttpClient } from '@angular/common/http';
import { FiltersService } from '../../_services/filters.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AnnounceService } from '../../_services/announce.service';
import { CarAnnounce } from '../../_models/carAnnounce';
import { AlertifyService } from '../../_services/alertify.service';
import { Model } from '../../_models/model';
import { ModelVersion } from '../../_models/modelVersion';
import { ManufacturingDate } from '../../_models/manufacturingDate';
import { Body } from '../../_models/body';
import { Fuel } from '../../_models/fuel';
import { Country } from '../../_models/country';
import { AuthService } from 'src/app/_services/auth.service';
import { Gearbox } from 'src/app/_models/gearbox';
import { PollutionRule } from 'src/app/_models/pollutionRule';
import { Transmission } from 'src/app/_models/transmission';

@Component({
  selector: "app-add-announce-modal",
  templateUrl: "./add-announce-modal.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./add-announce-modal.component.css"],
})
export class AddAnnounceModalComponent implements OnInit {
  announceForm: FormGroup;
  carAnnounce: CarAnnounce;
  public value: any = {};
  public brands: Brand[];
  public brandsName: Array<any> = [];
  brandId;
  public models: Model[];
  public modelsName: Array<any> = [];
  modelId;
  public modelVersions: ModelVersion[];
  public modelVersionsName:  Array<any> = [];

  public bodies: Body[];
  public bodiesName: Array<any> = [];
  bodyId;
  public manufacturingDates: ManufacturingDate[];
  public manufacturingDatesValues: Array<any> = [];
  manufacturingDateId;
  public fuels: Fuel[];
  public fuelsName: Array<any> = [];
  fuelId;
  public countries: Country[];
  public countriesName: Array<any> = [];
  countryId;
  public gearboxes: Gearbox[];
  public gearboxesName: Array<any> = [];
  gearboxId;

  constructor(
    private announceService: AnnounceService,
    public bsModalRef: BsModalRef,
    private alertify: AlertifyService,
    private http: HttpClient,
    private filtersService: FiltersService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService

  ) {}

  ngOnInit() {
    this.getBrandsNames();
    this.getBodiesNames();
    this.getModelsNames();
    this.getModelVersionsNames();
    this.getManufacturingDatesValues();
    this.getFuelsNames();
    this.getCountriesNames();
    this.getGearboxesNames();

    this.createAnnounceForm();
  }

  createAnnounce(){
    if(this.announceForm.valid) {
      this.carAnnounce = Object.assign({}, this.announceForm.value);
      this.carAnnounce.brandId = this.brandId;
      this.carAnnounce.modelId = this.modelId;
      // this.carAnnounce. = this.modelVersionId;
      this.carAnnounce.fuelId = this.fuelId;
      this.carAnnounce.countryId = this.brandId;
      this.carAnnounce.manufacturingDateId = this.manufacturingDateId;
      this.carAnnounce.bodyId = this.bodyId;

      this.announceService.createAnnounce(this.carAnnounce, this.authService.decodedToken.nameid).subscribe(() => {
        this.alertify.success("anunt adaugat cu succes");
      }, error => {
        this.alertify.error(error);
      });
    }
  }
  
  createAnnounceForm(){
    this.announceForm = this.fb.group(
      {
        title: ["", Validators.required],
        brands: ["", Validators.required],
        models: ["", Validators.required],
        modelVersions: ["", Validators.required],
        manufacturingDates: ["", Validators.required],
        bodies: ["", Validators.required],
        fuels: ["", Validators.required],
        countries: ["", Validators.required],
        km: ["", Validators.required],
        price: ["", Validators.required],
        enginePower: ["", Validators.required],
        cylindricalCapacity: ["", Validators.required],
        state: ["", Validators.required],
        damaged: ["", Validators.required],
        particleFilter: ["", Validators.required],
        rightHandDrive: ["", Validators.required],
        gearboxes: ["", Validators.required],
        description: [
          "",
          [
           Validators.required,
           Validators.minLength(10)
          ]
        ],
      }
    );
  }

  selectedBrand(value: any): void {
    this.brandId = value.id;
  }
  selectedCountry(value: any): void {
    this.countryId = value.id;
  }
  selectedFuel(value: any): void {
    this.fuelId = value.id;
  }
  selectedManDate(value: any): void {
    this.manufacturingDateId = value.id;
  }
  selectedModel(value: any): void {
    this.modelId = value.id;
  }
  selectedGearbox(value: any): void {
    this.gearboxId = value.id;
  }

  selectedBody(value: any): void {
    this.bodyId = value.id;
  }


  getBrandsNames():any {
    this.brands.forEach((brand) => {
      this.brandsName.push({
        id: brand.id,
        text: brand.name
      });
    });
  }

  getGearboxesNames():any {
    this.gearboxes.forEach((gearbox) => {
      this.gearboxesName.push({
        id: gearbox.id,
        text: gearbox.name
      });
    });
  }

  getModelsNames():any {
    this.models.forEach((model) => {
      this.modelsName.push({
        id: model.id,
        text: model.name
      });
    });
  }
  
  getModelVersionsNames():any {
    this.modelVersions.forEach((modelVersion) => {
      this.modelVersionsName.push({
        id: modelVersion.id,
        text: modelVersion.name
      });
    });
  }
  
  getManufacturingDatesValues():any {
    this.manufacturingDates.forEach((manufacturingDate) => {
      this.manufacturingDatesValues.push({
        id: manufacturingDate.id,
        text: manufacturingDate.year
      });
    });
  }

  getBodiesNames():any {
    this.bodies.forEach((body) => {
      this.bodiesName.push({
        id: body.id,
        text: body.name
      });
    });
  }

  getFuelsNames():any {
    this.fuels.forEach((fuel) => {
      this.fuelsName.push({
        id: fuel.id,
        text: fuel.name
      });
    });
  }

  getCountriesNames():any {
    this.countries.forEach((country) => {
      this.countriesName.push({
        id: country.id,
        text: country.name
      });
    });
  }

  public selected(value: any): void {
    console.log("Selected value is: ", value.id);
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
}
