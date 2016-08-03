import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Http, Headers } from '@angular/http';
import { Observable  } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergemap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/publish';
// import 'rxjs/add/operator/connect';


// http://ngcourse.rangle.io/handout/observables/using_observables.html
@Component({
  moduleId: module.id,
  selector: 'obs-baisc',
  templateUrl: 'obs-baisc.component.html',
  styleUrls: ['obs-baisc.component.css'],
  providers: [
  ]
})
export class ObsBaiscComponent implements OnInit {

  // private data: Observable<Array<number>>;
  private data: Observable<any>;
  private values: Array<number> = [];
  private anyErrors: any;
  private finished: boolean;
  private href: string = 'http://ngcourse.rangle.io/handout/observables/using_observables.html';

  private status: string;
  private doctors: Array<string> = [];

  constructor( private http: Http, private cd: ChangeDetectorRef ) {
    this.initObservable();
  }

  ngOnInit() {
    this.obsSubscription();
  }

  initObservable() {
    this.data = new Observable( observer => {
      setTimeout(() => {
        observer.next(1);
      }, 1000);
      setTimeout(() => {
        observer.next(2);
      }, 2000);
      setTimeout(() => {
        observer.next(3);
      }, 3000);
      setTimeout(() => {
        observer.next(Date.now());
      }, 4000);
      /*
      setTimeout(() => {
        observer.error('Observable Error')
      }, 2500);
      */
      setTimeout(() => {
        observer.complete();
      }, 6000);

      this.status = 'Started';
    })// .publish();
  }

  obsSubscription() {
    // let publish = this.data.publish();
    // publish.connect();

    let subscription = this.data.subscribe(
      (value: any) => this.values.push(value),
      error => this.anyErrors = error,
      () => this.finished = true
    );
    let forEach = this.data.forEach(
      (value: any) => {
        console.log('forEach: ' + value);
      }
    ).then( v => {
      console.log('forEach Promise finished: ' + v);
      this.status = 'Ended';
    });

    // Subscription A
    setTimeout(() => {
      this.data.subscribe(value => console.log('subA: ' + value));
    }, 0);
    // Subscription B
    setTimeout(() => {
      this.data.subscribe(value => console.log('    subB: ' + value));
    }, 2500);
  }

  startHttp() {
    this.doctors.length = 0;
    // Why we need to usr flatMap
    // --> http://stackoverflow.com/questions/33471526/why-we-need-to-use-flatmap
    this.http.get('http://jsonplaceholder.typicode.com/users')
      .do( data => console.log(data))     // _body: data
      .flatMap((data) => data.json())     // data:T' => data.json():Array<T> => Ovservable<Array<T>>
      .do( data => console.log(data))     // data:T' => debuging code => Observable<T'>
      .filter((person: any) => person.id > 5) // person:T' => boolean => Observable<T'>
      .do((person: any) => console.log(person.company.name))
      .map((person: any) => 'Dr. ' + person.name) // person:T' => T => Observable<T>
      .do(( name: any) =>  console.log('map: ' + name))
      .subscribe((name) => {
        this.doctors.push( name );
        this.cd.detectChanges();
      });
  }
}