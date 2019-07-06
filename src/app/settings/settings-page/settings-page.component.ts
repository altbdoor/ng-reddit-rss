import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { Subject, Subscription } from 'rxjs'
import { debounceTime } from 'rxjs/operators'

import { environment } from 'src/environments/environment'
import { LocalStorageService } from 'src/app/services/local-storage.service'

@Component({
    selector: 'app-settings-page',
    templateUrl: './settings-page.component.html',
    styleUrls: ['./settings-page.component.css'],
})
export class SettingsPageComponent implements OnInit, OnDestroy {
    form = this.fb.group({
        url: ['', Validators.required],
    })

    showSavedMessage = false
    saveTimeout = new Subject<null>()
    saveTimeout$ = this.saveTimeout.asObservable()
    saveTimeoutSub: Subscription

    constructor(private local: LocalStorageService, private fb: FormBuilder) {}

    ngOnInit() {
        let settings = this.local.get('settings-data')
        if (!settings) {
            settings = environment.defaultSettings
        }

        for (const key of Object.keys(settings)) {
            this.form.get(key).setValue(settings[key])
        }

        this.saveTimeoutSub = this.saveTimeout$
            .pipe(debounceTime(2000))
            .subscribe(() => {
                this.showSavedMessage = false
            })
    }

    ngOnDestroy() {
        this.saveTimeoutSub.unsubscribe()
    }

    save(form: FormGroup) {
        if (form.invalid) {
            return
        }

        this.local.set('settings-data', form.value)

        this.showSavedMessage = true
        this.saveTimeout.next()
    }

    reset(event: Event, form: FormGroup) {
        event.preventDefault()

        const settings = environment.defaultSettings
        for (const key of Object.keys(settings)) {
            form.get(key).setValue(settings[key])
        }
    }
}
