import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Competency} from '../model/competency.model';

@Injectable({
    providedIn: 'root'
})
export class CompetencyService {

    constructor() {
    }

    /** Subject that publishes competencies */
    competenciesSubject = new Subject<Map<string, Competency>>();

    /** Map of competencies */
    private competencies: Map<string, Competency>;

    public fetchCompetencies(forceReload = false) {
        if (this.competencies != null && !forceReload) {
            this.competenciesSubject.next(this.competencies);
        } else {
            this.findCompetencies();
        }
    }

    private findCompetencies() {
        const competenciesMap = new Map<string, Competency>();

        competenciesMap.set('1', new Competency(
            'Systemisch',
            'die Fähigkeit, Beziehungen zu erkennen und zu verstehen; komplexe Systeme zu analysieren; darüber nachzudenken, wie Systeme ' +
            'in verschiedene Domänen und verschiedene Maßstäbe eingebettet sind; und mit Unsicherheit umzugehen.'
        ));

        this.notifyCompetencies(this.competencies);
    }

    /**
     * Notifies subscribers that something has changed
     * @param competenciesMap competencies map
     */
    public notifyCompetencies(competenciesMap: Map<string, Competency>) {
        this.competenciesSubject.next(competenciesMap);
    }
}
