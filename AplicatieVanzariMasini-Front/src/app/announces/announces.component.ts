import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announces',
  templateUrl: './announces.component.html',
  styleUrls: ['./announces.component.css']
})
export class AnnouncesComponent implements OnInit {
  model: any ={};

  constructor() { }

  ngOnInit() {
  }

  announces(){
    console.log(this.model);
  }
  
  cancel(){

  }
}
