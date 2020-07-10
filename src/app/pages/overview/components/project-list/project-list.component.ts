import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Project} from '../../../../core/entity/model/project.model';
import {Goal} from '../../../../core/entity/model/goal.model';
import {Competency} from '../../../../core/entity/model/competency.model';
import {Partner} from '../../../../core/entity/model/partner.model';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnChanges {

    /** Map of projects */
    @Input() projectsMap = new Map<string, Project>();

    @Input() goalsMap: Map<string, Goal>;
    @Input() goalsBackground: 'transparent';
    @Input() competenciesMap: Map<string, Competency>;
    @Input() competenciesBackground: 'transparent';
    @Input() partnersMap: Map<string, Partner>;

    /** Projects to be displayed */
    projects = [];

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.initializeProjects();
    }

    /**
     * Initializes projects
     */
    private initializeProjects() {
        this.projects = Array.from(this.projectsMap.values());
    }
}
