import { Component } from '@angular/core';
import { Project } from './models/project.model';
import { FilterService } from './services/filter.service';
import { ProjectService } from './services/project.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private projectService: ProjectService, private filterService: FilterService) {
    // For running change detection
    // => Change between two or three columns per row
    window.addEventListener('resize', function() {});
  }

// TODO: Rename
  public divideProjectArrayIntoArraysForEachRow(): Array<Array<Project>> {
    const outerArray: Array<Array<Project>> = [];
    const projects = this.filterService.getFilteredProjects();

    let cardsPerRow = 2;
    if (window.matchMedia('(min-width: 1400px)').matches) {
      cardsPerRow = 3;
    }

    if (!(projects === undefined)) {
      let index = 0;
      let innerArray: Array<Project> = [];
      while (index < projects.length) {
        if (index % cardsPerRow === 0 && index !== 0) {
          outerArray.push(innerArray);
          innerArray = [];
        }
        innerArray.push(projects[index++]);
      }
      if (innerArray.length > 0) {
        outerArray.push(innerArray);
      }
      return outerArray;
    } else {
      return [];
    }
  }

  public get tags(): Array<string> {
    return this.projectService.tags;
  }

  public getColumnWidthClass() {
    if (window.matchMedia('(min-width: 1400px)').matches) {
      return 'col-lg-4';
    } else {
      return 'col-lg-6';
    }
  }

  public getCurrentYear(): number {
     return new Date().getFullYear();
  }
}
