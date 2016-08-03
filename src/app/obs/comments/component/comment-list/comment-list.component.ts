// Angular 2 Tutorial: HTTP Requests with Observables
// https://codequs.com/p/By-T81AO/angular-2-tutorial-http-requests-with-observables
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CommentBoxComponent } from '../comment-box/comment-box.component';
import { Comment } from '../../model/comment';
import {CommentService} from '../../service/comment.service';
import { EmitterService } from '../../emitter.service';

// Component decorator
@Component({
    selector: 'comment-list',
    template: `
        <comment-box [editId]="editId" [listId]="listId" *ngFor="let comment of comments" [comment]="comment"></comment-box>
    `,
    directives: [CommentBoxComponent],
    providers: [CommentService]
})
// Component class
export class CommentListComponent implements OnInit, OnChanges{
    // Constructor with injected service
    constructor(
        private commentService: CommentService
    ){}
    // Local properties
    comments: Comment[];
    // Input properties
    @Input() listId: string;
    @Input() editId: string;

    loadComments(){
        // Get all comments
         this.commentService.getComments()
            .subscribe(
                comments => this.comments = comments, //Bind to view
                err => {
                    // Log errors if any
                    console.log(err);
            });
    }

    ngOnInit(){
        // Load comments
        this.loadComments()
    }

    ngOnChanges(changes:any) {
        // Listen to the 'list'emitted event so as populate the model
        // with the event payload
        EmitterService.get(this.listId).subscribe((comments:Comment[]) => {this.loadComments()});
    }

 }
