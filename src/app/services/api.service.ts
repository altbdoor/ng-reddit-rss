import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { GfycatData } from '../models/gfycat'
import { RedditData } from '../models/reddit'

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) {}

    getNewPosts(url: string, nextId: string): Observable<RedditData> {
        const cleanUrl = new URL(url)
        cleanUrl.searchParams.append('after', nextId)
        return this.http.jsonp<RedditData>(cleanUrl.href, 'jsonp')
    }

    getGfycatData(id: string): Observable<{ id: string, url: string }> {
        return this.http.get<GfycatData>(`https://api.gfycat.com/v1/gfycats/${id}`).pipe(
            map(data => ({
                id: data.gfyItem.gfyId,
                url: data.gfyItem.mobileUrl,
            }))
        )
    }
}
