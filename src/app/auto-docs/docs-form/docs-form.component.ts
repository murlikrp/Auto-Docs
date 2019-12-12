import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';


import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-docs-form',
  templateUrl: './docs-form.component.html',
  styleUrls: ['./docs-form.component.css']
})
export class DocsFormComponent implements OnInit {

  @Output() submitForm = new EventEmitter();
  flag:boolean = false;
  constructor(private applicationService: ApplicationService) {
    this.masterSelected = false;
    this.checklist = [
      { id: 1, value: 'CRE Commitment Letter', isSelected: false },
      { id: 2, value: 'RES ACP Commitment Letter', isSelected: false },
      // { id: 3, value: 'Document C', isSelected: false },
      // { id: 4, value: 'Document D', isSelected: false }
    ];
    this.checkedList = [];
    this.getCheckedItemList();
  }

  formTypes = ['Lending', 'Servicing', 'Deposits', 'Employee','PWM'];
  loanNumSearchList: any = ['60-123456', '60-123457','60-123458','60-123459','60-444445','60-444423'];
  
  formSearchList: any = ['60-123456', '60-123457','60-123458','60-123459','60-444445','60-444423'];
  
  model = {
    formType: '',
    formSearch: '',
    loanNumber: ''
  };

  title = 'Select Documents';
  masterSelected: boolean;
  checklist: any;
  checkedList: any;
  conf:any = {};

  submitted = false;
  docLink = null;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.formSearchList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  searchLoanNum = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.loanNumSearchList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

    checkUncheckAll() {
      for (var i = 0; i < this.checklist.length; i++) {
        this.checklist[i].isSelected = this.masterSelected;
      }
      this.getCheckedItemList();
      // location.reload();
    }
    isAllSelected(event) {
      // this.masterSelected = this.checklist.every(function(item:any) {
      //     return item.isSelected == true;
      //   })
      // this.getCheckedItemList();
      
      this.submitted = false;
      console.log('conf after uncheck ',this.conf)
      if(event.target.checked) {
        this.getCheckedItemList();
      } 
    }
  
    getCheckedItemList(){
      this.checkedList = [];
      for (var i = 0; i < this.checklist.length; i++) {
        if(this.checklist[i].isSelected) {
          this.checkedList.push(this.checklist[i]);
        }
        // else if(this.checklist[0].isSelected) {
        //   this.checkedList.push(this.checklist[1]);
        // }
      }
      console.log('checkedList',this.checkedList)
      // this.checkedList = JSON.stringify(this.checkedList);
    }

  onSubmit() {
    
    this.submitted = true;
    const inputReqObj =  {
      formType: this.model.formType,
      formSearch: this.model.formSearch,
      loanNumber: this.model.loanNumber,
      selectedDocs: this.checkedList
    };
    // this.applicationService.getDoc(inputReqObj).subscribe(data => {
    //   this.docLink = data.docLink;
    //   this.submitForm.emit(this.docLink);
    // });

    this.applicationService.getFormList().subscribe(data => {
      
      if(this.checkedList[0].value == 'CRE Commitment Letter') {
        this.docLink = data.autoDocs[0].doclink[0].value;
        // this.submitted =false;
      } else if(this.checkedList[0].value == 'RES ACP Commitment Letter'){
        this.docLink = data.autoDocs[0].doclink[1].value;
        // this.submitted = false;
      }
      
      this.conf = {
        link : this.docLink,
        isSubmitted : this.submitted 
      }
      console.log('conf',this.conf);
      this.submitForm.emit(this.conf);
      // if(this.submitted && this.docLink) {
        
      // }
      this.submitted = false;
    })
  }

  ngOnInit() {
    this.model.formType = 'Lending';
    // this.applicationService.getFormList().subscribe(data => {
    //   // console.log(data);
    //  // this.formList = data.autoDocs[0].formType;
    //   console.log(this.formList);
    // });
  }

  onSelection(value) {
    
    switch(value) {
        case 'formtypevalue': 
            console.log(value);
            this.changeSelection();
            break; 
        
    }

  }

  changeSelection(){
    this.flag = true;
  }

}
