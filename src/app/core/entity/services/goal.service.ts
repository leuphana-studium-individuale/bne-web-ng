import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Goal} from '../model/goal.model';

@Injectable({
    providedIn: 'root'
})
export class GoalService {

    constructor() {
    }

    /** Subject that publishes goals */
    goalsSubject = new Subject<Map<string, Goal>>();

    /** Map of goals */
    private goals: Map<string, Goal>;

    public fetchGoals(forceReload = false) {
        if (this.goals != null && !forceReload) {
            this.goalsSubject.next(this.goals);
        } else {
            this.findGoals();
        }
    }

    private findGoals() {
        const goalsMap = new Map<string, Goal>();
        goalsMap.set('1', new Goal(
            1,
            'Keine Armut',
            'Armut in allen ihren Formen und überall beenden.'
        ));
        goalsMap.set('2', new Goal(
            2,
            'Kein Hunger',
            'Den Hunger beenden, Ernährungssicherheit und eine bessere Ernährung erreichen und eine nachhaltige Landwirtschaft fördern.'
        ));

        this.notifyGoals(goalsMap);
    }

    /**
     * Notifies subscribers that something has changed
     * @param goalsMap goals map
     */
    public notifyGoals(goalsMap: Map<string, Goal>) {
        this.goalsSubject.next(goalsMap);
    }
}
