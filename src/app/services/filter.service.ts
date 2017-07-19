import { Injectable } from '@angular/core';
import { ProjectService } from './project.service';
import { Project } from './../models/project.model';

@Injectable()
export class FilterService {
    private _projects: Array<Project>;
    private _filterProjectName: string;
    private _filterTags: Array<string> = new Array<string>();

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

    public get filterTags(): Array<string> {
        return this._filterTags;
    }

    public addFilterTag(value: string) {
        this._filterTags.push(value);
    }
    public removeFilterTag(value: string) {
        const copyOfValues = Array.from(this._filterTags);
        const index = copyOfValues.indexOf(value);
        let elements = copyOfValues.splice(0, index);
        elements = elements.concat(copyOfValues.splice(1));
        this._filterTags = elements;
    }

    public getFilteredProjects(): Array<Project> {
        if (this.filterTags.length === 0 && !this.projectNameFilter) {
            return this._projects;
        } else {
            return this._projects.filter(project =>
                this.includesTag(project.tags, this.filterTags) ||
                this.nameStartsWith(project.name, this.projectNameFilter));
        }
    }

    private includesTag(projectTags: Array<string>, filterTags: Array<string>): boolean {
        let includesTag = false;
        for (const item of projectTags) {
            for (let tag of filterTags) {
                tag = tag.toLowerCase().trim();
                if (item.toLowerCase().includes(tag)) {
                    includesTag = true;
                    break;
                }
            }
        }
        return includesTag;
    }

    private nameStartsWith(projectName: string, filterValue: string): boolean {
        if (!filterValue) {
            return false;
        }
        projectName = projectName.toLowerCase();
        filterValue = filterValue.toLowerCase();
        return projectName.startsWith(filterValue);
    }
}
