import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Competency} from '../model/competency.model';

@Injectable({
  providedIn: 'root'
})
export class CompetencyService {

  constructor() { }

  /** Subject that publishes competencies */
  competenciesSubject = new Subject<Map<string, Competency>>();
}
