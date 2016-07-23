import { Injectable } from '@angular/core';
import {
  AngularFire,
  FirebaseApp, FirebaseRef } from 'angularfire2';

@Injectable()
export class StorageService {
  
  constructor() {}

  upload( storageRef:firebase.storage.Reference, path:string, file:File, 
    metadata:firebase.storage.UploadMetadata ): firebase.storage.UploadTask {
    let uploadTask = storageRef.child( path + file.name ).put( file, metadata );
    return uploadTask;
  }

  download( storageRef:firebase.storage.Reference, path:string, file:string, metadata:any ): firebase.Promise<string> {
    let downloadRef:firebase.storage.Reference = storageRef.child(path + file);
    let downPromise = downloadRef.getDownloadURL();
    return downPromise;
  }
}
