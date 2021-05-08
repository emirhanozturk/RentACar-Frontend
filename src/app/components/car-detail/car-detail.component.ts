import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/car-image';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  carImages: CarImage[] = [];
  carDetails:Car[] = [];
  imageLoaded = false;
  dataLoaded = false;

  constructor(private carDetailService:CarDetailService,
    private carImageService:CarImageService,
    private activatedRoute:ActivatedRoute) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params['carid']){
        this.getCarImagesByCarId(params['carid']);
        this.getCarsByCarId(params['carid']);
      }
    })
  }

  getCarsByCarId(carId:number){
    this.carDetailService.getCarDetails(carId).subscribe(response=>{
      this.carDetails = response.data;
      this.dataLoaded = true;
    })
  }
  getCarImagesByCarId(carId:number){
    this.carImageService.getCarImagesByCarId(carId).subscribe(response=>{
      this.carImages = response.data;
      this.imageLoaded = true;
    })
  }

}
