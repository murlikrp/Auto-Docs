import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';

import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-docs-view',
  templateUrl: './docs-view.component.html',
  styleUrls: ['./docs-view.component.css']
})
export class DocsViewComponent implements OnInit {
  docLinkObj: any = {};
  @Input() docLink: any;
  @Input() isSubmitted:boolean;
    constructor(private applicationService: ApplicationService, public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.docLink = this.docLink;
  }

  getUrl(docLink: any) {
    console.log(docLink);
    return 'https://view.officeapps.live.com/op/embed.aspx?src=' + docLink;
  }
}
