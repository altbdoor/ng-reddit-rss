import { Component, OnInit, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { fromEvent, Observable, EMPTY } from 'rxjs'
import { debounceTime, filter, switchMap, map, finalize, catchError, tap, scan, startWith } from 'rxjs/operators'
import { WINDOW } from 'ngx-window-token'
import * as he from 'he'

import { environment } from 'src/environments/environment'
import { LocalStorageService } from 'src/app/local-storage.service'
import { ApiService } from 'src/app/api.service'
import { PostItem } from 'src/app/models/post_item'
import { RedditData } from 'src/app/models/reddit';

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
                const viewportHeight = this.window.pageYOffset + this.window.innerHeight
                const pageHeight = this.document.body.clientHeight - 200
                return viewportHeight >= pageHeight
            }),
            filter(() => (!this.loading && !this.error && this.hasMore)),
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
                const accIdList = acc.map(post => post.id)
                val = val.filter(post => !accIdList.includes(post.id))
                return acc.concat(val)
            }, [])
        )
    }

    convertPostItem(data: RedditData): PostItem[] {
        return data.data.children
            .map((post) => post.data)
            .filter((post) => {
                try {
                    return post.secure_media.oembed.provider_name.toLowerCase() === 'gfycat'
                } catch (e) {}

                return false
            })
            .map((post) => {
                const postId = `${post.subreddit_id}-${post.id}`
                const thumbnailUrl = post.secure_media.oembed.thumbnail_url
                const gfyId = thumbnailUrl.replace(
                    /(.+?thumbs\.gfycat\.com(%2F|\/)|-size_restricted.+)/g,
                    ''
                )

                return {
                    id: postId,
                    gfyId,
                    title: he.decode(post.title),
                    thumbnail: post.thumbnail,
                    permalink: post.permalink,
                } as PostItem
            })
    }
}
