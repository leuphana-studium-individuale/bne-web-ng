import {Goal} from './goal.model';
import {Competency} from './competency.model';
import {Partner} from './partner.model';

export class Project {
    title: string;
    description: string;
    costPerChild: number;
    costTotal: number;
    effortInHours: number;
    durationInDays: number;
    logoName: string;
    url: string;

    sustainableDevelopmentGoals: Goal[];
    competencies: Competency[];
    partner: Partner;
}
