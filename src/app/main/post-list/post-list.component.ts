import { DOCUMENT } from '@angular/common'
import { Component, Inject, OnInit } from '@angular/core'
import * as he from 'he'
import { WINDOW } from 'ngx-window-token'
import { EMPTY, fromEvent, Observable } from 'rxjs'
import {
    catchError,
    debounceTime,
    filter,
    finalize,
    map,
    scan,
    startWith,
    switchMap,
    tap,
} from 'rxjs/operators'
import { PostItem } from 'src/app/models/post_item'
import { RedditApiData } from 'src/app/models/reddit'
import { ApiService } from 'src/app/services/api.service'
import { LocalStorageService } from 'src/app/services/local-storage.service'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
    loading = false
    error = false
    hasMore = true
    nextId = ''

    postList$: Observable<PostItem[]>

    constructor(
        @Inject(WINDOW) private window: Window,
        @Inject(DOCUMENT) private document: Document,
        private api: ApiService,
        private local: LocalStorageService
    ) {}

    ngOnInit() {
        let settings = this.local.get('settings-data')
        if (!settings) {
            settings = environment.defaultSettings
        }

        const scrollEvt$ = fromEvent(this.window, 'scroll').pipe(
            debounceTime(200),
            filter(() => {
                const viewportHeight =
                    this.window.pageYOffset + this.window.innerHeight
                const pageHeight = this.document.body.clientHeight - 200
                return viewportHeight >= pageHeight
            }),
            filter(() => !this.loading && !this.error && this.hasMore)
        )

        this.postList$ = scrollEvt$.pipe(
            startWith(0),
            switchMap(() => {
                this.loading = true
                return this.api.getNewPosts(settings.url, this.nextId).pipe(
                    finalize(() => (this.loading = false)),
                    catchError(() => {
                        this.error = true
                        return EMPTY
                    })
                )
            }),
            tap((data) => {
                this.nextId = data.data.after
                this.hasMore = !!data.data.after
            }),
            map((data) => this.convertPostItem(data)),
            scan((acc: PostItem[], val) => {
                const accIdList = acc.map((post) => post.id)
                val = val.filter((post) => !accIdList.includes(post.id))
                return acc.concat(val)
            }, [])
        )
    }

    convertPostItem(data: RedditApiData): PostItem[] {
        return data.data.children
            .map((post) => post.data)
            .filter((post) => post.url.startsWith('https://gfycat.com/'))
            .map((post) => ({
                id: `${post.subreddit_id}-${post.id}`,
                gfyId: post.url.replace('https://gfycat.com/', '').replace('gifs/detail/', ''),
                title: he.decode(post.title),
                thumbnail: post.thumbnail,
                permalink: post.permalink,
            }))
    }
}
