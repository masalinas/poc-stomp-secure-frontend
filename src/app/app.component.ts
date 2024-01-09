import { Component, OnDestroy } from '@angular/core';

// Websocket services
import { Subscription } from 'rxjs';
import { Message } from '@stomp/stompjs'

// app services and models
import { RxStompService } from './shared/websocket/rx-stomp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  readonly REST_ECHO = '/app/echo';

  readonly QUEUE_ECHO = '/user/queue/echo';
  readonly QUEUE_ECHO_HIT = '/user/queue/echo/hit';

  private subscription: Subscription;
  private subscriptionHit: Subscription;

  constructor(private rxStompService: RxStompService) { 
    this.subscription = this.rxStompService
      .watch(this.QUEUE_ECHO).subscribe((message: Message) => {
        const result = message.body;

        console.log(result);
      });
    
    this.subscriptionHit = this.rxStompService
      .watch(this.QUEUE_ECHO_HIT).subscribe((message: Message) => {
        const result = message.body;

        console.log(result);
      });
  }
  
  onMessage(event: any) {
    this.rxStompService.publish({
      destination: this.REST_ECHO,
      body: JSON.stringify(
        { 'text': "Hello WebSockets", 'steps': 5 })
    });
  }

  ngOnDestroy() {    
    this.subscription.unsubscribe();
    this.subscriptionHit.unsubscribe();
  }  
}
