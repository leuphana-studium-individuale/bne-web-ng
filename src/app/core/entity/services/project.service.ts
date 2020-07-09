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
            '1',
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
        projectsMap.set('2', new Project(
            '2',
            'AckerKita',
            'Das Bildungsprogramm GemüseAckerdemie „AckerKita“ schafft Naturerfahrungsräume in Einrichtungen frühkindlicher Bildung. Ziel des Programms ist es, durch spielerisches und praktisches Erleben die Wertschätzung für Lebensmittel und das Interesse für biologische Vielfalt zu steigern. Durch den Anbau, die Ernte und das Verarbeiten von Gemüse lernen Kinder landwirtschaftliches Grundwissen und erfahren den natürlichen Verlauf eines AckerJahres mit allen Sinnen.',
            15,
            0,
            0,
            100,
            '',
            'https://www.gemueseackerdemie.de/ackerkita/',
            ['1'],
            ['1'],
            '0'
        ));

        this.notifyProjects(projectsMap);
    }

    /**
     * Notifies subscribers that something has changed
     * @param projectsMap projects map
     */
    public notifyProjects(projectsMap: Map<string, Project>) {
        this.projectsSubject.next(projectsMap);
    }
}
