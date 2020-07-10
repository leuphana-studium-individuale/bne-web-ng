import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../../core/entity/model/project.model';
import {Goal} from '../../../../core/entity/model/goal.model';
import {Partner} from '../../../../core/entity/model/partner.model';
import {Competency} from '../../../../core/entity/model/competency.model';

@Component({
    selector: 'app-project-list-item',
    templateUrl: './project-list-item.component.html',
    styleUrls: ['./project-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListItemComponent implements OnInit {

    @Input() project: Project;

    @Input() goalsMap: Map<string, Goal>;
    @Input() goalsBackground: 'transparent';
    @Input() competenciesMap: Map<string, Competency>;
    @Input() competenciesBackground: 'transparent';
    @Input() partnersMap: Map<string, Partner>;

    projectGoals = [];
    projectCompetencies = [];

    constructor() {
    }

    ngOnInit(): void {
        this.project.sustainableDevelopmentGoalIds.forEach(id => {
            const goal = this.goalsMap.get(id);
            if (goal != null) {
                this.projectGoals.push(goal.title);
            }
        });

        this.project.competencyIds.forEach(id => {
            const competency = this.competenciesMap.get(id);
            if (competency != null) {
                this.projectCompetencies.push(competency.title);
            }
        });
    }

    onDetailsButtonClicked() {
        console.log('BOING');
    }
}
