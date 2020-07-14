import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Project} from '../../../../core/entity/model/project.model';
import {Goal} from '../../../../core/entity/model/goal.model';
import {Competency} from '../../../../core/entity/model/competency.model';
import {Partner} from '../../../../core/entity/model/partner.model';

/**
 * Displays a project list
 */
@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnChanges {

    /** Map of projects */
    @Input() projectsMap = new Map<string, Project>();

    /** Map of goals */
    @Input() goalsMap: Map<string, Goal>;
    /** Background color for goal tags */
    @Input() goalsBackground: 'transparent';
    /** Map of competencies */
    @Input() competenciesMap: Map<string, Competency>;
    /** Background color for competencies tags */
    @Input() competenciesBackground: 'transparent';
    /** Map of partners */
    @Input() partnersMap: Map<string, Partner>;
    /** Event emitter indicating details button being clicked */
    @Output() detailsButtonClickedEventEmitter = new EventEmitter<number>();

    /** Projects to be displayed */
    projects = [];

    //
    // Lifecycle hooks
    //

    /**
     * Handles on-changes lifecycle phase
     */
    ngOnChanges(changes: SimpleChanges) {
        this.initializeProjects();
    }

    //
    // Initialization
    //

    /**
     * Initializes projects
     */
    private initializeProjects() {
        this.projects = Array.from(this.projectsMap.values());
    }

    //
    // Actions
    //

    /**
     * Handles click on details button
     * @param event project ID
     */
    onDetailsButtonClicked(event: number) {
        this.detailsButtonClickedEventEmitter.emit(event);
    }
}
