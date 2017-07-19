import { Injectable } from '@angular/core';
import { Project } from './../models/project.model';
import { HttpService } from './http.service';

@Injectable()
export class ProjectService {
    private _projects: Promise<Array<Project>>;
    private _projectNames: Array<string>;
    private _tags: Array<string>;

    constructor(private httpService: HttpService) {}

    public get projects(): Promise<Array<Project>> {
        if (this._projects === undefined) {
            const projectsJsonPromise = this.httpService.getContentAsJsonFromUrl(
                'https://raw.githubusercontent.com/saxsys/saxsys.github.io/master/data/projects.json');
            this._projects = projectsJsonPromise
                .then(response => response.projects as Array<Project>)
                .then(projectsArray => {
                    for (const project of projectsArray) {
                        const projectUrl = project.url;
                        const requestUrl = 'https://api.github.com/repos/' + projectUrl.slice(19);
                        this.httpService.getContentAsJsonFromUrl(requestUrl)
                            .then(response => {
                                project.stars = response.stargazers_count as number;
                                project.forks = response.forks_count as number;
                            });
                    }
                    return projectsArray;
                })
        }
        return this._projects;
    }

    public get projectNames(): Array<string> {
        if (this._projectNames === undefined) {
            this.projects.then(projectsArray => this._projectNames = this.getNamesFromProjects(projectsArray).sort());
        }
        return this._projectNames;
    }

    private getNamesFromProjects(projects: Array<Project>): Array<string> {
        let projectNames = new Array<string>();
        for (const project of projects) {
            projectNames = projectNames.concat(project.name);
        }
        return projectNames.filter(this.isUnique);
    }

    public get tags(): Array<string> {
        if (this._tags === undefined) {
            this.projects.then(projectsArray => this._tags = this.getTagsFromProjects(projectsArray).sort());
        }
        return this._tags;
    }

    private getTagsFromProjects(projects: Array<Project>): Array<string> {
        let tags = new Array<string>();
        for (const project of projects) {
            tags = tags.concat(project.tags);
        }
        return tags.filter(this.isUnique);
    }

    private isUnique(value, index, self): boolean {
        return self.indexOf(value) === index;
    }
}
