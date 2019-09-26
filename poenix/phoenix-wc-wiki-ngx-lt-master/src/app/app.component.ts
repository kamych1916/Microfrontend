import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges, OnDestroy { 
  title = 'phoenix-wc-wiki-ngx-lt';

  @Input() token: string;

  constructor() {
    console.log('token constructor=' + this.token);
  }

  ngOnInit() {
    console.log('token ngOnInit=' + this.token);
    window.addEventListener('phoenix-wc-wiki-ngx-ce-data-sent-test', this.customEventListenerFunction, true);
  }

  customEventListenerFunction(event) {
    console.log('text from enother Comp - ' , event.detail);
  }

  ngOnChanges(changes: {[token: string]: SimpleChange}) {
    // check the object "changes" for new data
    console.log('token ngOnChanges=' + this.token);
    
  }

  ngOnDestroy(): void {
    window.removeEventListener('changeNameToCustomEvent', this.customEventListenerFunction, true);
  }

}
