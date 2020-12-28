import {Component, OnInit} from '@angular/core';
import {RxWebsocketService} from 'rx-websocket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'davidyu1983-libraries';
  message$ = this.websocketService.messages$;

  constructor(private websocketService: RxWebsocketService) {
  }

  ngOnInit(): void {
    // this.websocketService.connect();
  }


}
