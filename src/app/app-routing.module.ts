import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { MainPageComponent } from './main/main-page/main-page.component'
import { SettingsPageComponent } from './settings/settings-page/settings-page.component'
import { PlayerComponent } from './main/player/player.component'

const routes: Routes = [
    {
        path: 'settings',
        component: SettingsPageComponent,
    },
    {
        path: 'main',
        component: MainPageComponent,
    },
    {
        path: '',
        outlet: 'modal',
        children: [
            {
                path: 'play/:gfyId/:possibleGfyId',
                component: PlayerComponent,
            },
        ],
    },
    {
        path: '**',
        redirectTo: '/main',
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
