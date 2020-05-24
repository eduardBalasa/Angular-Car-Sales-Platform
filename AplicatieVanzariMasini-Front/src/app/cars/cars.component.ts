import { Component, OnInit } from '@angular/core';
import { Car } from '../_models/car';
import { CarService } from '../_services/car.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  car: Car;
  cars: Car[];
  id: number;

  constructor(private carsService: CarService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadCar();
    this.getCar(this.id);
    this.getCars();
  }

  loadCar(){
    this.carsService.getCar(+this.route.snapshot.params['id']).subscribe((car: Car) => {
      this.car = car;
    }, error => {
      this.alertify.error(error);
    });
  }

  getCar(id: number){
    this.carsService.getCar(id).subscribe((car : Car) => {
      this.car = car;
    }, error => {
      console.log(error);
    });
  }

  getCars(){
    this.carsService.getCars().subscribe((cars: Car[]) => {
      this.cars = cars;
    }, error => {
      console.log(error);
    });
  }

}
