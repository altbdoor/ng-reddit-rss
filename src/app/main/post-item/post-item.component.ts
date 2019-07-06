import { Component, OnInit, Input } from '@angular/core'
import { Router } from '@angular/router'

import { PostItem } from 'src/app/models/post_item'

@Component({
    selector: 'app-post-item',
    templateUrl: './post-item.component.html',
    styleUrls: ['./post-item.component.css'],
})
export class PostItemComponent implements OnInit {
    @Input() post: PostItem

    constructor(private router: Router) {}

    ngOnInit() {}

    showPost(event: Event, target: HTMLElement, gfyId: string) {
        if (!target.closest('.badge')) {
            event.preventDefault()
            this.router.navigate([{ outlets: { modal: ['play', gfyId] } }])
        }
    }
}
