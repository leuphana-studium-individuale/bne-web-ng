import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Project} from '../model/project.model';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor() {
    }

    /** Subject that publishes project */
    projectsSubject = new Subject<Map<string, Project>>();

    /** Map of projects */
    private projects: Map<string, Project>;

    public fetchProjects(forceReload = false) {
        if (this.projects != null && !forceReload) {
            this.projectsSubject.next(this.projects);
        } else {
            this.findProjects();
        }
    }

    private findProjects() {
        const projectsMap = new Map<string, Project>();

        projectsMap.set('1', new Project(
            'AckerSchule',
            'Die GemüseAckerdemie ist ein ganzjähriges theorie- und praxisbasiertes Bildungsprogramm mit dem Ziel, die Wertschätzung von Lebensmitteln bei Kindern und Jugendlichen zu steigern. Unser Konzept wirkt gegen den Wissens- und Kompetenzverlust im Bereich Lebensmittelproduktion, die Entfremdung von der Natur, ungesunde Ernährungsgewohnheiten sowie Lebensmittelverschwendung.',
            20,
            0,
            0,
            100,
            '',
            'https://www.gemueseackerdemie.de/ackerschule/',
            ['2', '12', '13'],
            ['0', '4'],
            '0'
        ));

        this.notifyProjects(this.projects);
    }

    /**
     * Notifies subscribers that something has changed
     * @param projectsMap projects map
     */
    public notifyProjects(projectsMap: Map<string, Project>) {
        this.projectsSubject.next(projectsMap);
    }
}
