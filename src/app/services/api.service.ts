import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { GfycatApiData } from '../models/gfycat'
import { RedditApiData } from '../models/reddit'

interface GfycatData {
    id: string
    mp4: string
    webm: string
}

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private gfycatCache = new Map<string, GfycatData>()

    constructor(private http: HttpClient) {}

    getNewPosts(url: string, nextId: string): Observable<RedditApiData> {
        const cleanUrl = new URL(url)
        cleanUrl.searchParams.append('after', nextId)
        return this.http.jsonp<RedditApiData>(cleanUrl.href, 'jsonp')
    }

    getGfycatData(id: string): Observable<GfycatData> {
        if (this.gfycatCache.has(id)) {
            return of(this.gfycatCache.get(id))
        }

        return this.http
            .get<GfycatApiData>(`https://api.gfycat.com/v1/gfycats/${id}`)
            .pipe(
                map((data) => ({
                    id: data.gfyItem.gfyId,
                    mp4: data.gfyItem.mobileUrl,
                    webm: data.gfyItem.webmUrl,
                })),
                tap((data) => this.gfycatCache.set(id, data))
            )
    }
}
