import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DraggableModule } from './common/directive/ng2-draggable';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { CenterComponent } from './center/center.component';

import { UPLOAD_DIRECTIVES } from 'ng2-uploader/ng2-uploader';
import { HttpModule, JsonpModule } from '@angular/http';

@NgModule({
    imports: [BrowserModule, DraggableModule, HttpModule, JsonpModule],
    declarations: [AppComponent, HeaderComponent, CenterComponent, UPLOAD_DIRECTIVES ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
