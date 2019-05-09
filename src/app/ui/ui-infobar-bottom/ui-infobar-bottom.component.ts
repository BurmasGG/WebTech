import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
@Component({
  selector: 'app-ui-infobar-bottom',
  templateUrl: './ui-infobar-bottom.component.html',
  styleUrls: []
})
export class UiInfobarBottomComponent implements OnInit {

  private readonly notifier: NotifierService;

  constructor(notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit() {

    this.notifier.notify('InfoBox', 'Hallo?', 'INFOID');


  }
  position: {
    horizontal: {
      position: 'left',
      diatance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 12
      gap: 10
    }
  }

  behaviour:{
    autohide: 5000,
    onClick: false;
    onMouseover: 'pauseAutoHide'
    showDismissButti: true;

  }
}
