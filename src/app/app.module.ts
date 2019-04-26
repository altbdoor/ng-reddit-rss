import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NavbarComponent } from './main/navbar/navbar.component'
import { SettingsPageComponent } from './settings/settings-page/settings-page.component'
import { MainPageComponent } from './main/main-page/main-page.component'
import { PostListComponent } from './main/post-list/post-list.component'
import { PostItemComponent } from './main/post-item/post-item.component'
import { PlayerComponent } from './main/player/player.component'

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        SettingsPageComponent,
        MainPageComponent,
        PostListComponent,
        PostItemComponent,
        PlayerComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
