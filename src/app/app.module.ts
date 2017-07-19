import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FilterComponent } from './filter/filter.component';
import { ProjectTileComponent } from './project-tile/project-tile.component';
import { TagComponent } from './tag/tag.component';

import { FilterService } from './services/filter.service';
import { HttpService } from './services/http.service';
import { ProjectService } from './services/project.service';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    ProjectTileComponent,
    TagComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [FilterService, HttpService, ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
