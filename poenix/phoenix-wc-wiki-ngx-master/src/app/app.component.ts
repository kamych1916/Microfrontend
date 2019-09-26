import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'phoenix-wc-wiki-ngx';
  childInput: string;
  sendCustomEvent() {
    const name = this.childInput;
    console.log('childInputParent: ', this.childInput);
    const event = new CustomEvent('phoenix-wc-wiki-ngx-ce-data-sent-test', { detail: name });
    window.dispatchEvent(event);
  };
  ngOnInit(){
    window.addEventListener('this-text-for-connect', this.ParentCustomEventListenerFunction, true)
  }

  ParentCustomEventListenerFunction(event){
    console.log("FromParentComp: ", event.detail); 
    this.childInput = event.detail
  }

  ngOnDestroy(): void {
    window.removeEventListener('ParentChangeNameToCustomEvent', this.ParentCustomEventListenerFunction, true);
  }
}
