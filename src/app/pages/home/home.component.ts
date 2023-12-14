import { AfterViewInit, Component, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { CardsDataService } from 'src/app/service/cards-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit{
  data:any=[];
  constructor( private authService:AuthService , private router:Router , private cardsData:CardsDataService){


    this. postData();

  }
  ngAfterViewInit(){

      this. postData();

  }

  postData(){
    this.data=[]
    this.cardsData.getDataFromLocalStorage();
    this.cardsData.sendData().subscribe(data =>{
    this.data.push(data);
    })
  }

  logout(){
    this.authService.logout().subscribe(()=>{
      this.router.navigate(['login']);
    })
  }
}
