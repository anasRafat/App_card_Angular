import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardsDataService {
  cards: any = [
    {
      id: 1,
      title: 'Card title',
      details: 'Some quick example text to build on the card',
      img: '../../../assets/1.png.webp',
    },
    {
      id: 2,
      title: 'Card title',
      details: 'Some quick example text to build on the card',
      img: '../../../assets/1.png.webp',
    },
  ];

  save() {
    localStorage.setItem('data', JSON.stringify(this.cards));
  }

  getDataFromLocalStorage() {
    const a: any = localStorage.getItem('data');
    this.cards = JSON.parse(a) || [];
  }

  addCard(obj: any) {
    this.cards.push(obj);
    this.save();
  }
  delete(id: any) {
    this.cards = this.cards.filter((card: any) => card.id !== id);
    this.save();
    console.log(this.cards);
  }

  sendData(): Observable<any> {
    return from(this.cards);
  }

  update(id: any, card: any) {
    console.log(card);
    let index = this.cards.findIndex((card: any) => card.id == id);
    this.cards[index] = card;
    this.cards.push(card);
    this.save();
  }

  constructor() {}
}
