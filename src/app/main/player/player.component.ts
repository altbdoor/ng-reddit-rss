import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, of } from 'rxjs'
import { ApiService, GfycatData } from 'src/app/services/api.service'

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
    gfyData$: Observable<GfycatData>

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        apiService: ApiService
    ) {
        const { gfyId, possibleGfyId } = this.route.snapshot.params
        if (possibleGfyId !== '-') {
            this.gfyData$ = of({
                id: possibleGfyId,
                mp4: `https://thumbs.gfycat.com/${possibleGfyId}-mobile.mp4`,
                webm: `https://giant.gfycat.com/${possibleGfyId}.webm`,
            })
        } else {
            this.gfyData$ = apiService.getGfycatData(gfyId)
        }
    }

    ngOnInit() {}

    dismiss(target: HTMLElement) {
        if (!target.closest('.player__video')) {
            this.router.navigate([{ outlets: { modal: null } }])
        }
    }
}
