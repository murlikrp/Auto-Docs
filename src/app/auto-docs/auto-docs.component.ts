import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-auto-docs',
  templateUrl: './auto-docs.component.html',
  styleUrls: ['./auto-docs.component.css'],
  providers: [
    ApplicationService
  ]
})
export class AutoDocsComponent implements OnInit {
  docLink = null;
  isSubmitted:boolean=false;
  constructor() { }

  ngOnInit() {
  }

  submitForm(data: any) {
    console.log('data ',data);
   this.docLink =  data.link;
   this.isSubmitted = data.isSubmitted;
  }

}
