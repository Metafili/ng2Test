import { Component, OnInit } from '@angular/core';
import { Observable  } from 'rxjs/Observable';

// http://ngcourse.rangle.io/handout/observables/using_observables.html
@Component({
  moduleId: module.id,
  selector: 'obs-baisc',
  templateUrl: 'obs-baisc.component.html',
  styleUrls: ['obs-baisc.component.css']
})
export class ObsBaiscComponent implements OnInit {

  private data: Observable<Array<number>>;
  private values: Array<number> = [];
  private anyErrors: boolean;
  private finished: boolean;

  constructor() {
    this.data = new Observable( observer => { 
      observer.next(42);
      observer.next(43);
      observer.complete();
    })
  }

  ngOnInit() {
    let subscription = this.data.subscribe(
      (value:any) => this.values.push(value),
      error => this.anyErrors = true,
      () => this.finished = true
    );
  }
}