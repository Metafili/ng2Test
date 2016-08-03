import { Component} from '@angular/core';
import { CommentFormComponent } from './component/comment-form/comment-form.component'
import { CommentListComponent } from './component/comment-list/comment-list.component'
import {EmitterService} from './emitter.service';

@Component({
    selector: 'comment-widget',
    template: `
        <div>
            <comment-form [listId]="listId" [editId]="editId"></comment-form>
            <comment-list [listId]="listId" [editId]="editId"></comment-list>
        </div>
    `,
    directives: [CommentListComponent, CommentFormComponent],
    providers: [EmitterService]
})
export class CommentComponent {
    // Event tracking properties
    private listId = 'COMMENT_COMPONENT_LIST';
    private editId = 'COMMENT_COMPONENT_EDIT';
 }
