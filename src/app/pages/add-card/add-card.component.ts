import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CardsDataService } from 'src/app/service/cards-data.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
})
export class AddCardComponent {
  addForm: FormGroup;
  fileName = '';
  url: any;
  constructor(
    private fb: FormBuilder,
    private cardsDataService: CardsDataService,
    private router: Router ,
    private http: HttpClient
  ) {
    this.addForm = this.fb.group({
      title: ['',Validators.required],
      details: [''],
      img: ['',Validators.required],
      id: [''],
    });
  }
  add() {
    this.addForm.get('id')?.setValue(this.nextId());
    var path = this.addForm.get('img')?.value ;
    var filename = path.replace("C:\\fakepath\\", "../../../assets/");
    this.addForm.value.img=filename ;
    var card = this.addForm.value;
    this.cardsDataService.addCard(card);
    this.router.navigate(['/home']);
    console.log(this.cardsDataService.cards)
  }

  nextId() {
    let lastElement =
      this.cardsDataService.cards[this.cardsDataService.cards.length - 1];
    let id = 0;
    id=(parseInt(lastElement?.id)+ 1 ) || 1;
    return id;
  }
  onFileSelected(event:any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;

        const formData = new FormData();

        formData.append("thumbnail", file);
    }
}


}
