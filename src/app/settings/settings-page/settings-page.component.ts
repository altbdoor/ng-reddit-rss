import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Subject, Subscription } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import { LocalStorageService } from 'src/app/services/local-storage.service'
import { environment } from 'src/environments/environment'

@Component({
    selector: 'app-settings-page',
    templateUrl: './settings-page.component.html',
    styleUrls: ['./settings-page.component.css'],
})
export class SettingsPageComponent implements OnInit, OnDestroy {
    form: FormGroup

    showSavedMessage = false
    saveTimeout = new Subject<null>()
    saveTimeout$ = this.saveTimeout.asObservable()
    saveTimeoutSub: Subscription

    constructor(private local: LocalStorageService, private fb: FormBuilder) {
        this.form = this.fb.group({
            url: ['', Validators.required],
        })
    }

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
