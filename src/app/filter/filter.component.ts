import { Component } from '@angular/core';
import { FilterService } from './../services/filter.service';
import { ProjectService } from './../services/project.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})

export class FilterComponent {

  // FilterService required for template
  constructor(public filterService: FilterService, private projectService: ProjectService) {}

  public get dataListValues(): Array<string> {
    return this.projectService.projectNames;
  }
}
