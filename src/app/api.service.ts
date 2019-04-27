import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { of } from 'rxjs'
import { take, map, tap, retryWhen, delay } from 'rxjs/operators'

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    nextId = ''
    hasMore = true

    constructor(private http: HttpClient) {}

    clearState() {
        this.nextId = ''
        this.hasMore = true
    }

    getPosts(url: string) {
        const cleanUrl = new URL(url)
        cleanUrl.searchParams.append('after', this.nextId)

        if (!this.hasMore) {
            return of([])
        }

        return this.http.jsonp(cleanUrl.href, 'jsonp').pipe(
            tap((data: any) => (this.nextId = data.data.after)),
            tap((data: any) => (this.hasMore = !!data.data.after)),
            map((data: any) =>
                data.data.children.map((post: any) => post.data)
            ),
            retryWhen((err) =>
                err.pipe(
                    delay(500),
                    take(3)
                )
            )
        )
    }
}
