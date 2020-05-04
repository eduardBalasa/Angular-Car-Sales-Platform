import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap";
import { Brand } from "../_models/brand";
import { HttpClient } from '@angular/common/http';
import { FiltersService } from '../_services/filters.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-add-announce-modal",
  templateUrl: "./add-announce-modal.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./add-announce-modal.component.css"],
})
export class AddAnnounceModalComponent implements OnInit {
  announceForm: FormGroup;
  public value: any = {};
  public brands: Brand[];
  public brandsName: string[] = [];

  constructor(
    public bsModalRef: BsModalRef,
    private http: HttpClient,
    private filtersService: FiltersService,
    private route: ActivatedRoute,
    private fb: FormBuilder

  ) {}

  ngOnInit() {
    this.getBrandsForCar();
    debugger;
    console.log(this.brands);
    this.createAnnounceForm();
  }
  
  createAnnounceForm(){
    this.announceForm = this.fb.group(
      {
        kilometers: ["", Validators.required],
        description: [
          "",
          [
           Validators.required,
           Validators.minLength(10)
          ]
        ],
        price: ["", Validators.required]
      }
    );
  }

  getBrandsForCar() {
    this.route.data.subscribe((data) => {
      debugger;
      this.brands = data.brands;
      this.getBrandsNames();
    });
  }

  getBrandsNames() {
    debugger;
    this.brands.forEach((brand) => {
      debugger;
      this.brandsName.push(brand.name);
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
}
