import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { RedditData } from '../models/reddit'

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) {}

    getNewPosts(url: string, nextId: string): Observable<RedditData> {
        const cleanUrl = new URL(url)
        cleanUrl.searchParams.append('after', nextId)
        return this.http
            .jsonp(cleanUrl.href, 'jsonp')
            .pipe(map((data) => data as RedditData))
    }
}
