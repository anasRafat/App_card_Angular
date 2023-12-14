import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CardsDataService } from 'src/app/service/cards-data.service';

@Component({
  selector: 'app-update-card',
  templateUrl: './update-card.component.html',
  styleUrls: ['./update-card.component.scss']
})
export class UpdateCardComponent {
  updateForm:FormGroup ;
  id:any;
  fileName = '';
  constructor(
    private fb: FormBuilder,
    private cardsDataService: CardsDataService,
    private activatedRoute:ActivatedRoute,
    private router: Router
    ){
      this.id= this.activatedRoute.snapshot.paramMap.get('id');

      this.updateForm = this.fb.group({
        title: ['',Validators.required],
        details: [''],
        img: ['',Validators.required],
        id:[parseInt(this.id)]
      });

    }
    update(){
      var path = this.updateForm.get('img')?.value ;
      var filename = path.replace("C:\\fakepath\\", "../../../assets/");
      this.updateForm.value.img=filename ;
      this.cardsDataService.update(this.id,this.updateForm.value);
      this.router.navigate(['/home']);
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
