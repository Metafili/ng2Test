import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable  } from 'rxjs/Observable';
import {Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergemap'; // flatMap
import 'rxjs/add/operator/filter';

/**
 * Torgeir Helgevold: Angular 2.0 And Http
 *  -https://github.com/thelgevold/angular-2-samples
 */
@Component({
  moduleId: module.id,
  selector: 'app-http',
  templateUrl: 'http.component.html',
  styleUrls: ['http.component.css']
})
export class HttpComponent implements OnInit {

  private doctors: Array<string> = [];
  result: Object;
  combined: any;
  error: Object;
  contract: any;
  customer: any;
  postResponse = new Person();
  friendsAsPromise: any;
  pendingRequest: any;
  capitol: any;
  activeCountry: string;
  country = new Subject();

  constructor(private http: Http, private cd: ChangeDetectorRef) {
    this.loadFriendsSuccessFully();
    this.loadFriendsWithError();
    this.loadContractByCustomer();
    this.loadFriendsAndCustomers();
    this.loadFriendsAsPromise();

    this.getCapitol()
  }

  ngOnInit() {
    this.startHttp();
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

  getCapitol(){
    this.country.switchMap((country) => this.http.get('./json/country-info/' + country + '.json'))
                .map((res: Response) => res.json())
                .subscribe(res => this.capitol = res.capitol);
  }

  isActive(country){
    return this.activeCountry === country;
  }

  loadFriendsAsPromise(){
    this.friendsAsPromise = {};
    this.http.get('./json/friends.json').toPromise()
    .then((res: Response) => {
        this.friendsAsPromise.friends = res.json().friends;
    });
  }

  loadFriendsAndCustomers(){
    this.combined = {friends:[],customer:{}};
    Observable.forkJoin(
        this.http.get('./json/friends.json').map((res: Response) => res.json()),
        this.http.get('./json/customer.json').map((res: Response) => res.json())
    ).subscribe(res => this.combined = {friends:res[0].friends, customer:res[1]});
  }

  loadFriendsSuccessFully(){
    this.result = {friends:[]};
    this.http.get('./json/friends.json')
        .map((res: Response) => res.json())
        .subscribe(res => this.result = res);
  }

  loadContractByCustomer(){
    this.http.get('./json/customer.json').map((res: Response) => {
            this.customer = res.json();
            return this.customer;
        })
        .flatMap((customer) => this.http.get(customer.contractUrl)).map((res: Response) => res.json())
        .subscribe(res => this.contract = res);
  }

  loadFriendsWithError(){
    this.result = {friends:[]};
    this.http.get('./json/friends2.json').map((res: Response) => res.json())
             .subscribe(
                res => this.result = res,
                error => this.error = error
             );
  }

  postData(){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('http://www.syntaxsuccess.com/poc-post/', {firstName:'Joe',lastName:'Smith'}, {headers:headers})
        .map((res: Response) => res.json())
        .subscribe((res:Person) => this.postResponse = res);
  }
}

class Person{
    firstName:string;
    lastName:string;
}
