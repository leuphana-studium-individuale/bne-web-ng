import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectService} from '../../../../core/entity/services/project.service';
import {Observable, Subject} from 'rxjs';
import {Project} from '../../../../core/entity/model/project.model';
import {filter, takeUntil} from 'rxjs/operators';
import {Goal} from '../../../../core/entity/model/goal.model';
import {Competency} from '../../../../core/entity/model/competency.model';
import {Partner} from '../../../../core/entity/model/partner.model';
import {CompetencyService} from '../../../../core/entity/services/competency.service';
import {PartnerService} from '../../../../core/entity/services/partner.service';
import {GoalService} from '../../../../core/entity/services/goal.service';
import {MaterialColorService} from '../../../../core/ui/services/material-color.service';
import {MaterialIconService} from '../../../../core/ui/services/material-icon.service';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

    /** Map of projects */
    public projectsMap = new Map<string, Project>();
    /** Array of filtered projects */
    public projectsMapFiltered = new Map<string, Project>();

    public goalsMap = new Map<string, Goal>();
    public competenciesMap = new Map<string, Competency>();
    public partnersMap = new Map<string, Partner>();

    /** Helper subject used to finish other subscriptions */
    public unsubscribeSubject = new Subject();

    constructor(private iconRegistry: MatIconRegistry,
                private sanitizer: DomSanitizer,
                private materialColorService: MaterialColorService,
                private materialIconService: MaterialIconService,
                private projectService: ProjectService,
                private goalService: GoalService,
                private competencyService: CompetencyService,
                private partnerService: PartnerService) {
    }

    ngOnInit() {
        this.initializeSubscriptions();

        this.initializeMaterial();

        this.findEntities();
    }

    ngOnDestroy() {
        this.unsubscribeSubject.next();
        this.unsubscribeSubject.complete();
    }

    //
    // Events
    //

    onProjectsUpdated(projects: Map<string, Project>) {
        this.initializeProjects(projects);
        this.initializeProjectsFiltered(projects);
    }

    onGoalsUpdated(goals: Map<string, Goal>) {
        this.initializeGoals(goals);
    }

    onCompetenciesUpdated(competencies: Map<string, Competency>) {
        this.initializeCompetencies(competencies);
    }

    onPartnersUpdated(partners: Map<string, Partner>) {
        this.initializePartners(partners);
    }

    //
    // Initialization
    //

    private initializeSubscriptions() {
        this.initializeProjectsSubscription().subscribe(value => {
            this.onProjectsUpdated(value as Map<string, Project>);
        });
        this.initializeGoalsSubscription().subscribe(value => {
            this.onGoalsUpdated(value as Map<string, Goal>);
        });
        this.initializeCompetenciesSubscription().subscribe(value => {
            this.onCompetenciesUpdated(value as Map<string, Competency>);
        });
        this.initializePartnersSubscription().subscribe(value => {
            this.onPartnersUpdated(value as Map<string, Partner>);
        });
    }

    private initializeProjectsSubscription(): Observable<Map<string, Project>> {
        return this.projectService.projectsSubject.pipe(
            takeUntil(this.unsubscribeSubject),
            filter(value => value != null)
        );
    }

    private initializeGoalsSubscription(): Observable<Map<string, Goal>> {
        return this.goalService.goalsSubject.pipe(
            takeUntil(this.unsubscribeSubject),
            filter(value => value != null)
        );
    }

    private initializeCompetenciesSubscription(): Observable<Map<string, Competency>> {
        return this.competencyService.competenciesSubject.pipe(
            takeUntil(this.unsubscribeSubject),
            filter(value => value != null)
        );
    }

    private initializePartnersSubscription(): Observable<Map<string, Partner>> {
        return this.partnerService.partnersSubject.pipe(
            takeUntil(this.unsubscribeSubject),
            filter(value => value != null)
        );
    }

    private initializeProjects(projectsMap: Map<string, Project>) {
        this.projectsMap = new Map(projectsMap);
    }

    private initializeGoals(goalsMap: Map<string, Goal>) {
        this.goalsMap = new Map(goalsMap);
    }

    private initializeCompetencies(competenciesMap: Map<string, Competency>) {
        this.competenciesMap = new Map(competenciesMap);
    }

    private initializePartners(partnersMap: Map<string, Partner>) {
        this.partnersMap = new Map(partnersMap);
    }

    private initializeProjectsFiltered(projectsMap: Map<string, Project>) {
        const projectsMapFiltered = new Map<string, Project>();

        Array.from(projectsMap.values()).filter(project => {
            return this.filterProject(project);
        }).forEach(project => {
            projectsMapFiltered.set(project.id, project);
        });

        this.projectsMapFiltered = new Map(projectsMapFiltered);
    }

    protected initializeMaterial() {
        this.materialIconService.initializeIcons(this.iconRegistry, this.sanitizer);
    }

    //
    //
    //

    private filterProject(project: Project): boolean {
        // TODO Implement
        return true;
    }

    protected findEntities(forceReload = false) {
        this.projectService.fetchProjects(forceReload);
        this.goalService.fetchGoals(forceReload);
        this.competencyService.fetchCompetencies(forceReload);
        this.partnerService.fetchPartners(forceReload);
    }
}
