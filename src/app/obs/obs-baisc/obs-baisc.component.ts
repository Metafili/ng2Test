import { Component, OnInit } from '@angular/core';
import { Observable  } from 'rxjs/Observable';
import { Http } from '@angular/http';

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

  private data: Observable<Array<number>>;
  private values: Array<number> = [];
  private anyErrors: any;
  private finished: boolean;
  private href: string = 'http://ngcourse.rangle.io/handout/observables/using_observables.html';

  private status: string;
  private doctors: Array<string>;

  constructor( private http: Http ) {
    this.data = new Observable( observer => {
      setTimeout(() => {
        observer.next(42);
      }, 1000);
      setTimeout(() => {
        observer.next(43);
      }, 2000);
      setTimeout(() => {
        observer.error('Observable Error')
      }, 2500);
      setTimeout(() => {
        observer.complete();
      }, 3000);

      this.status = 'Started';
    });

    this.http.get('http://jsonplaceholder.typicode.com/posts/1')
      .subscribe((data) => {
        this.doctors = data.json().data;
      });
  }

  ngOnInit() {
    let subscription = this.data.subscribe(
      (value: any) => this.values.push(value),
      error => this.anyErrors = error,
      () => this.finished = true
    );
    let forEach = this.data.forEach(
      (value: any) => {
        console.log(value);
      }
    ).then( v => {
      console.log('forEach Promise finished: ' + v);
      this.status = 'Ended';
    });
  }
}