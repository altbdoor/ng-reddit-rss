import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ApiService } from 'src/app/services/api.service'

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
    gfyData$ = this.apiService.getGfycatData(this.route.snapshot.params.gfyId)

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private apiService: ApiService
    ) {}

    ngOnInit() {}

    dismiss(target: HTMLElement) {
        if (!target.closest('.player__video')) {
            this.router.navigate([{ outlets: { modal: null } }])
        }
    }
}
