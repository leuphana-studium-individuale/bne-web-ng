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
}
