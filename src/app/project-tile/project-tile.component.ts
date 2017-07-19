import { Component, Input } from '@angular/core';
import { Project } from './../models/project.model';

@Component({
  selector: 'app-project-tile',
  templateUrl: './project-tile.component.html',
  styleUrls: ['./project-tile.component.css']
})

export class ProjectTileComponent {
  @Input() project: Project;

  constructor() {}
}