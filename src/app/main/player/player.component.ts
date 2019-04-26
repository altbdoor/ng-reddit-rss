import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.css'],
})
export class PlayerComponent implements OnInit {
    gfyId = ''
    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.gfyId = this.route.snapshot.params.gfyId
    }

    dismiss(target: HTMLElement) {
        if (!target.closest('.player__video')) {
            this.router.navigate([{ outlets: { modal: null } }])
        }
    }
}
