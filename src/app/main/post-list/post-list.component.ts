import { Component, OnInit, OnDestroy, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { fromEvent, Subscription } from 'rxjs'
import { take, debounceTime } from 'rxjs/operators'
import { WINDOW } from 'ngx-window-token'

import { environment } from 'src/environments/environment'
import { LocalStorageService } from 'src/app/local-storage.service'
import { ApiService } from 'src/app/api.service'

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
    loading = false
    error = false
    hasMore = true
    postList = []

    scrollSub: Subscription

    constructor(
        @Inject(WINDOW) private xWindow: Window,
        @Inject(DOCUMENT) private xDocument: Document,
        private api: ApiService,
        private local: LocalStorageService
    ) {}

    ngOnInit() {
        this.api.clearState()
        this.getPosts()

        this.bindScrollHandler()
    }

    ngOnDestroy() {
        this.scrollSub.unsubscribe()
    }

    getPosts() {
        if (this.loading || this.error || !this.hasMore) {
            return
        }

        this.loading = true
        this.error = false

        let settings = this.local.get('settings-data')
        if (!settings) {
            settings = environment.defaultSettings
        }

        this.api
            .getPosts(settings.url)
            .pipe(take(1))
            .subscribe(
                (data) => {
                    this.hasMore = data.length > 0

                    const existingIdList = this.postList.map(
                        (post) => `${post.subreddit_id}-${post.id}`
                    )
                    const filteredData = data.filter((post: any) => {
                        let isGfycat = false

                        try {
                            isGfycat =
                                post.secure_media.oembed.provider_name.toLowerCase() ===
                                'gfycat'
                        } catch (e) {}

                        const postId = `${post.subreddit_id}-${post.id}`
                        const isExisting = existingIdList.includes(postId)

                        return isGfycat && !isExisting
                    })

                    this.postList = this.postList.concat(filteredData)
                },
                () => {
                    this.error = true
                },
                () => {
                    this.loading = false
                }
            )
    }

    bindScrollHandler() {
        this.scrollSub = fromEvent(this.xWindow, 'scroll')
            .pipe(debounceTime(150))
            .subscribe(() => {
                if (this.loading || this.error || !this.hasMore) {
                    return
                }

                if (
                    this.xWindow.pageYOffset + this.xWindow.innerHeight >=
                    this.xDocument.body.clientHeight - 200
                ) {
                    this.getPosts()
                }
            })
    }
}
