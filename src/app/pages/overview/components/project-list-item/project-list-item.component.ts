import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from '../../../../core/entity/model/project.model';
import {Goal} from '../../../../core/entity/model/goal.model';
import {Partner} from '../../../../core/entity/model/partner.model';
import {Competency} from '../../../../core/entity/model/competency.model';

/**
 * Displays project overiew
 */
@Component({
    selector: 'app-project-list-item',
    templateUrl: './project-list-item.component.html',
    styleUrls: ['./project-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListItemComponent implements OnInit {

    /** Project to be displayed */
    @Input() project: Project;
    /** Map of goals */
    @Input() goalsMap: Map<number, Goal>;
    /** Background color for goal tags */
    @Input() goalsBackground: 'transparent';
    /** Map of competencies */
    @Input() competenciesMap: Map<number, Competency>;
    /** Background color for competencies tags */
    @Input() competenciesBackground: 'transparent';
    /** Map of partners */
    @Input() partnersMap: Map<string, Partner>;
    /** Event emitter indicating details button being clicked */
    @Output() detailsButtonClickedEventEmitter = new EventEmitter<number>();

    /** List of project goals */
    projectGoals = [];
    /** List of project competencies */
    projectCompetencies = [];

    //
    // Lifecycle hooks
    //

    /**
     * Handles on-init lifecycle phase
     */
    ngOnInit() {
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

    //
    // Actions
    //

    /**
     * Handles click on details button
     */
    onDetailsButtonClicked() {
        this.detailsButtonClickedEventEmitter.emit(this.project.id);
    }
}
