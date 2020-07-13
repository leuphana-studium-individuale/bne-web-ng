import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Project} from '../model/project.model';
import {PROJECT_DATA} from '../model/project.mock';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor() {
    }

    /** Subject that publishes project */
    projectsSubject = new Subject<Map<number, Project>>();

    /** Map of projects */
    private projects: Map<number, Project>;

    public fetchProjects(forceReload = false) {
        if (this.projects != null && !forceReload) {
            this.projectsSubject.next(this.projects);
        } else {
            this.findProjects();
        }
    }

    private findProjects() {
        const projectsMap = new Map<number, Project>();

        PROJECT_DATA.forEach(p => {
            projectsMap.set(p.id, p);
        });

        this.notifyProjects(projectsMap);
    }

    /**
     * Notifies subscribers that something has changed
     * @param projectsMap projects map
     */
    public notifyProjects(projectsMap: Map<number, Project>) {
        this.projectsSubject.next(projectsMap);
    }
}
