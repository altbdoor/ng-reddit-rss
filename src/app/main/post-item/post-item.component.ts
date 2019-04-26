import { Component, OnInit, Input } from '@angular/core'
import { Router } from '@angular/router'

import * as he from 'he'

@Component({
    selector: 'app-post-item',
    templateUrl: './post-item.component.html',
    styleUrls: ['./post-item.component.css'],
})
export class PostItemComponent implements OnInit {
    @Input() post: any
    gfyId = ''
    postTitle = ''

    constructor(private router: Router) {}

    ngOnInit() {
        const thumbnailUrl = this.post.secure_media.oembed.thumbnail_url
        this.gfyId = thumbnailUrl.replace(
            /(.+?thumbs\.gfycat\.com(%2F|\/)|-size_restricted.+)/g,
            ''
        )

        this.postTitle = he.decode(this.post.title)
    }

    showPost(event: Event, target: HTMLElement, gfyId: string) {
        if (!target.closest('.badge')) {
            event.preventDefault()
            this.router.navigate([{ outlets: { modal: ['play', gfyId] } }])
        }
    }
}
