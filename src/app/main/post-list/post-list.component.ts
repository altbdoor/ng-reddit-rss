import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core'
import * as he from 'he'
import { EMPTY, Observable, Subject } from 'rxjs'
import {
    catchError,
    filter,
    finalize,
    map,
    scan,
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
export class PostListComponent implements OnInit, AfterViewInit, OnDestroy {
    loading = false
    error = false
    hasMore = true
    nextId = ''

    postList$: Observable<PostItem[]>

    @ViewChild('loadingBlock', { static: false })
    loadingBlock: ElementRef
    scrollObserver: IntersectionObserver
    scrollBottom$ = new Subject()

    constructor(private api: ApiService, private local: LocalStorageService) {}

    ngOnInit() {
        let settings = this.local.get('settings-data')
        if (!settings) {
            settings = environment.defaultSettings
        }

        this.postList$ = this.scrollBottom$.asObservable().pipe(
            filter(() => !this.loading && !this.error && this.hasMore),
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

    ngAfterViewInit() {
        this.scrollObserver = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    this.scrollBottom$.next()
                }
            },
            {
                root: null,
                rootMargin: '0px 0px 400px 0px',
            }
        )

        this.scrollObserver.observe(this.loadingBlock.nativeElement)
    }

    ngOnDestroy() {
        this.scrollObserver.disconnect()
    }

    convertPostItem(data: RedditApiData): PostItem[] {
        return data.data.children
            .map((post) => post.data)
            .filter((post) =>
                post.url.startsWith('https://gfycat.com/') ||
                post.url.startsWith('https://redgifs.com/')
            )
            .map((post) => {
                let possibleGfyId = '-'
                const gfyId = post.url
                    .replace('https://gfycat.com/', '')
                    .replace('gifs/detail/', '')
                    .replace('.gif', '')
                    .replace('https://redgifs.com/', '')
                    .replace('watch/', '')
                    .split('-')
                    .shift()

                if (gfyId.toLowerCase() !== gfyId) {
                    possibleGfyId = gfyId
                } else {
                    try {
                        const possibleMatch = decodeURIComponent(
                            post.secure_media_embed.content
                        ).match(
                            /thumbs\.gfycat\.com\/(.+?)-size_restricted\.gif/
                        )

                        if (
                            possibleMatch &&
                            possibleMatch[1] &&
                            possibleMatch[1] !== gfyId
                        ) {
                            possibleGfyId = possibleMatch[1]
                        }
                    } catch (err) {}
                }

                return {
                    id: `${post.subreddit_id}-${post.id}`,
                    gfyId,
                    title: he.decode(post.title),
                    thumbnail: post.thumbnail,
                    permalink: post.permalink,
                    possibleGfyId,
                }
            })
    }
}
