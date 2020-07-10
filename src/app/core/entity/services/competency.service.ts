import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Competency} from '../model/competency.model';
import {COMPETENCY_DATA} from '../model/competency.mock';

@Injectable({
    providedIn: 'root'
})
export class CompetencyService {

    constructor() {
    }

    /** Subject that publishes competencies */
    competenciesSubject = new Subject<Map<number, Competency>>();

    /** Map of competencies */
    private competencies: Map<number, Competency>;

    public fetchCompetencies(forceReload = false) {
        if (this.competencies != null && !forceReload) {
            this.competenciesSubject.next(this.competencies);
        } else {
            this.findCompetencies();
        }
    }

    private findCompetencies() {
        const competenciesMap = new Map<number, Competency>();

        COMPETENCY_DATA.forEach(c => {
            competenciesMap.set(c.id, c);
        });

        this.notifyCompetencies(competenciesMap);
    }

    /**
     * Notifies subscribers that something has changed
     * @param competenciesMap competencies map
     */
    public notifyCompetencies(competenciesMap: Map<number, Competency>) {
        this.competenciesSubject.next(competenciesMap);
    }
}
