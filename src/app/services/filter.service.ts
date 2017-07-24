import { Injectable } from '@angular/core';
import { ProjectService } from './project.service';
import { Project } from './../models/project.model';

@Injectable()
export class FilterService {
    private _projects: Array<Project>;
    private _filterProjectName: string;
    private _filterTag: string;

    constructor(private projectService: ProjectService) {
        this.projectService.projects.then(projects => {
            this._projects = projects;
        });
    }
    public get projectNameFilter(): string {
        return this._filterProjectName;
    }
    public set projectNameFilter(value: string) {
        this._filterProjectName = value;
    }

    public get filterTag(): string {
        return this._filterTag;
    }
    public set filterTag(value: string) {
        this._filterTag = value;
    }

    public getFilteredProjects(): Array<Project> {
        if (this.projectNameFilter && this.filterTag) {
            return this._projects.filter(project => this.nameStartsWith(project.name, this.projectNameFilter) &&
                this.includesTag(project.tags, this.filterTag));
        } else if (this.projectNameFilter) {
            return this._projects.filter(project => this.nameStartsWith(project.name, this.projectNameFilter));
        } else if (this.filterTag) {
            return this._projects.filter(project => this.includesTag(project.tags, this.filterTag));
        } else {
            return this._projects;
        }
    }

    private nameStartsWith(projectName: string, filterValue: string): boolean {
        if (!filterValue) {
            return false;
        }
        projectName = projectName.toLowerCase();
        filterValue = filterValue.toLowerCase();
        return projectName.startsWith(filterValue);
    }

    private includesTag(projectTags: Array<string>, filterTag: string): boolean {
        let includesTag = false;
        for (const tag of projectTags) {
            if (tag.toLowerCase() === this.filterTag.toLowerCase()) {
                includesTag = true;
                break;
            }
        }
        return includesTag;
    }
}
