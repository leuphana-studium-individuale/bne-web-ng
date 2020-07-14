import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Competency} from '../model/competency.model';
import {COMPETENCY_DATA} from '../model/competency.mock';

/**
 * Handles competencies
 */
@Injectable({
    providedIn: 'root'
})
export class CompetencyService {

    /** Subject that publishes competencies */
    competenciesSubject = new Subject<Map<number, Competency>>();

    /** Map of competencies */
    private competencies: Map<number, Competency>;

    /**
     * Fetches competencies from storage
     * @param forceReload force reload
     */
    public fetchCompetencies(forceReload = false) {
        if (this.competencies != null && !forceReload) {
            this.competenciesSubject.next(this.competencies);
        } else {
            this.loadMockCompetencies();
        }
    }

    /**
     * Loads mock competencies
     */
    private loadMockCompetencies() {
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
