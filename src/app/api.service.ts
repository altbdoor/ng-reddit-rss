import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { take, map, tap, retryWhen, delay } from 'rxjs/operators'

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    nextId = ''

    constructor(private http: HttpClient) {}

    clearNextId() {
        this.nextId = ''
    }

    getPosts(url: string) {
        const cleanUrl = new URL(url)
        cleanUrl.searchParams.append('after', this.nextId)

        return this.http.jsonp(cleanUrl.href, 'jsonp').pipe(
            tap((data: any) => (this.nextId = data.data.after)),
            map((data: any) =>
                data.data.children
                    .map((post: any) => post.data)
                    .filter((post: any) => {
                        let isGfycat = false

                        try {
                            isGfycat =
                                post.secure_media.oembed.provider_name.toLowerCase() ===
                                'gfycat'
                        } catch (e) {}

                        return isGfycat
                    })
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
