import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Goal} from '../model/goal.model';
import {GOAL_DATA} from '../model/goal.mock';

/**
 * Handles goals
 */
@Injectable({
    providedIn: 'root'
})
export class GoalService {

    /** Subject that publishes goals */
    goalsSubject = new Subject<Map<number, Goal>>();

    /** Map of goals */
    private goals: Map<number, Goal>;

    /**
     * Fetches goals from storage
     * @param forceReload force reload
     */
    public fetchGoals(forceReload = false) {
        if (this.goals != null && !forceReload) {
            this.goalsSubject.next(this.goals);
        } else {
            this.findGoals();
        }
    }

    /**
     * Loads mock goals
     */
    private findGoals() {
        const goalsMap = new Map<number, Goal>();

        GOAL_DATA.forEach(g => {
            goalsMap.set(g.id, g);
        });

        this.notifyGoals(goalsMap);
    }

    /**
     * Notifies subscribers that something has changed
     * @param goalsMap goals map
     */
    public notifyGoals(goalsMap: Map<number, Goal>) {
        this.goalsSubject.next(goalsMap);
    }
}
