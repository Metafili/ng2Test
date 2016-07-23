import { Component, Inject, OnInit } from '@angular/core';
import {
  AngularFire,
  FirebaseApp, FirebaseRef,
  FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { StorageService } from './storage.service';

// Angular2 File upload from input type=file
// http://stackoverflow.com/questions/35399617/angular-2-file-upload-from-input-type-file
// Using Firebase 3 in Angular 2 and Ionic 2
// https://webcake.co/using-firebase-3-in-angular-2-and-ionic-2/

@Component({
  moduleId: module.id,
  selector: 'storage',
  templateUrl: 'storage.component.html',
  styleUrls: ['storage.component.css'],
  providers: [StorageService]
})
export class StorageComponent implements OnInit {

  storage:firebase.storage.Storage;
  storageRef:firebase.storage.Reference;
  static storageSvc:StorageService; // Nested Access of this
  
  db:firebase.database.Database;

  // Upload
  file:File;
  metadata:any;

  // For cancel
  // uploadTask:firebase.storage.UploadTask;

  // Download
  static downloadUrl:string;
  
  constructor( 
    @Inject(FirebaseApp) firebaseApp: firebase.app.App, 
    af: AngularFire, storageSvc:StorageService ) {

    this.storage = firebase.storage();
    this.storageRef = this.storage.ref();
    StorageComponent.storageSvc = storageSvc;

    this.db = firebase.database();
  }

  ngOnInit() {
  }

  onFilePicker(event) {
    let files = event.srcElement.files;
    this.file = files[0];
    console.log("File: " + this.file.name );

    this.metadata = { contentType: 'image/jpeg' };
    this.upload( this.storageRef, 'tmp/images/', this.file, this.metadata );
  }

  upload( storageRef, path:string, file:File, metadata:firebase.storage.UploadMetadata ) {

    let uploadTask = StorageComponent.storageSvc.upload( storageRef, path, file, metadata );
    uploadTask.on('state_changed', function(snapshot){
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');

      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }

    }, function(error:any) {
      switch (error) {
        case 'storage/unauthorized':
          break;
        case 'storage/canceled':
          break;
        case 'storage/unknown':
          break;
      }
      console.log('Error: ' + error);
    }, function() {
      var downloadURL = uploadTask.snapshot.downloadURL;
      console.log("Upload: URL: " + downloadURL );

      // Download for Testing
      StorageComponent.download( storageRef, path, file.name, metadata );
    });
  }

  public static download( storageRef, path:string, file:string, metadata:any ) {
    let downPromise = StorageComponent.storageSvc.download( storageRef, path, file, metadata );
    downPromise.then(function(url) {
    // Insert url into an <img> tag to "download"
      StorageComponent.downloadUrl = url; // Nested Access of this
      console.log("Download: URL: " + url );
    }).catch(function(error) {
      switch (error) {
        case 'storage/object_not_found':
          break;
        case 'storage/unauthorized':
          break;
        case 'storage/canceled':
          break;
        case 'storage/unknown':
          break;
        default: // Promise.then error
          break;
      }
      console.log('Error: ' + error);
    });
  }
  
  get getDownloadUrl() {
    return StorageComponent.downloadUrl;
  }

  // Debugging 
  get diagDownload() {
    return StorageComponent.downloadUrl;
  }

}
