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
}
