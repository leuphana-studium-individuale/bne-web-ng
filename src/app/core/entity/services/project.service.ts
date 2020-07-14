import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Project} from '../model/project.model';
import {PROJECT_DATA} from '../model/project.mock';

/**
 * Handles projects
 */
@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    /** Subject that publishes project */
    projectsSubject = new Subject<Map<number, Project>>();

    /** Map of projects */
    private projects: Map<number, Project>;

    /**
     * Fetches projects from storage
     * @param forceReload force reload
     */
    public fetchProjects(forceReload = false) {
        if (this.projects != null && !forceReload) {
            this.projectsSubject.next(this.projects);
        } else {
            this.findProjects();
        }
    }

    /**
     * Loads mock projects
     */
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
