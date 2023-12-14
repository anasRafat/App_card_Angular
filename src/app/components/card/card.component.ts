import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardsDataService } from 'src/app/service/cards-data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() data: any ;
  @Output() deleteEvent :EventEmitter<any> =new EventEmitter<any>();
  constructor(
    private cardsDataService:CardsDataService
  ){
  }
  del(id:any){
    this.cardsDataService.delete(id);
    this.pushEvent();
  }
  pushEvent(){
    this.deleteEvent.emit(event)
  }


}
