import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ProjectService} from '../../../../core/entity/services/project.service';
import {Subject} from 'rxjs';
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
import {animate, state, style, transition, trigger} from '@angular/animations';

export class SelectableGoal extends Goal {
    selected = false;

    constructor(goal: Goal) {
        super(goal.id, goal.title, goal.shortDescription);
    }
}

export class SelectableCompetency extends Competency {
    selected = false;

    constructor(competency: Competency) {
        super(competency.id, competency.title, competency.shortDescription);
    }
}

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    animations: [
        trigger('searchPanelAnimation', [
            state('open', style({
                opacity: '1',
                overflow: 'hidden',
                height: '*',
            })),
            state('closed', style({
                opacity: '0',
                overflow: 'hidden',
                height: '0px',
            })),
            transition('* => *', animate('400ms ease-in-out'))
        ])
    ]
})
export class OverviewComponent implements OnInit, OnChanges, OnDestroy {

    /** Map of projects */
    public projectsMap = new Map<number, Project>();
    /** Array of filtered projects */
    public projectsMapFiltered = new Map<number, Project>();

    public selectableGoalsMap = new Map<number, SelectableGoal>();
    public selectableCompetenciesMap = new Map<number, SelectableCompetency>();
    public partnersMap = new Map<number, Partner>();

    private priceLimit = 0;

    public goalsBackgroundColor = 'transparent';
    public competenciesBackgroundColor = 'transparent';
    public costPerChildColor = 'transparent';

    goalsValuesMap: Map<string, boolean> = new Map<string, boolean>();
    competenciesValuesMap: Map<string, boolean> = new Map<string, boolean>();

    searchPanelState = 'closed';

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

        this.goalsBackgroundColor = this.materialColorService.primary;
        this.competenciesBackgroundColor = this.materialColorService.accent;
        this.costPerChildColor = this.materialColorService.primary;

        this.findEntities();
    }

    ngOnChanges(changes: SimpleChanges) {

        this.competenciesValuesMap = new Map<string, boolean>();
        this.selectableCompetenciesMap.forEach((value: SelectableCompetency, key: number) => {
            this.competenciesValuesMap.set(value.title, value.selected);
        });
    }

    ngOnDestroy() {
        this.unsubscribeSubject.next();
        this.unsubscribeSubject.complete();
    }

    //
    // Events
    //

    onProjectsUpdated(projects: Map<number, Project>) {
        this.initializeProjects(projects);
        this.initializeProjectsFiltered(projects);

        this.initializeFilters();
    }

    onGoalsUpdated(goals: Map<number, Goal>) {
        this.initializeGoals(goals);
        this.initializeValueMaps();
    }

    onCompetenciesUpdated(competencies: Map<number, Competency>) {
        this.initializeCompetencies(competencies);
        this.initializeValueMaps();
    }

    onPartnersUpdated(partners: Map<number, Partner>) {
        this.initializePartners(partners);
        this.initializeValueMaps();
    }

    //
    // Initialization
    //

    private initializeSubscriptions() {
        this.projectService.projectsSubject.pipe(
            takeUntil(this.unsubscribeSubject),
            filter(value => value != null)
        ).subscribe(value => {
            this.onProjectsUpdated(value as Map<number, Project>);
        });
        this.goalService.goalsSubject.pipe(
            takeUntil(this.unsubscribeSubject),
            filter(value => value != null)
        ).subscribe(value => {
            this.onGoalsUpdated(value as Map<number, Goal>);
        });
        this.competencyService.competenciesSubject.pipe(
            takeUntil(this.unsubscribeSubject),
            filter(value => value != null)
        ).subscribe(value => {
            this.onCompetenciesUpdated(value as Map<number, Competency>);
        });
        this.partnerService.partnersSubject.pipe(
            takeUntil(this.unsubscribeSubject),
            filter(value => value != null)
        ).subscribe(value => {
            this.onPartnersUpdated(value as Map<number, Partner>);
        });
    }

    private initializeProjects(projectsMap: Map<number, Project>) {
        this.projectsMap = new Map(projectsMap);
    }

    private initializeGoals(goalsMap: Map<number, Goal>) {
        this.selectableGoalsMap = new Map<number, SelectableGoal>();
        goalsMap.forEach((value: Goal, key: number) => {
            this.selectableGoalsMap.set(key, new SelectableGoal(value));
            this.goalsValuesMap.set(value.title, false);
        });
    }

    private initializeCompetencies(competenciesMap: Map<number, Competency>) {
        this.selectableCompetenciesMap = new Map<number, SelectableCompetency>();
        competenciesMap.forEach((value: Competency, key: number) => {
            this.selectableCompetenciesMap.set(key, new SelectableCompetency(value));
            this.competenciesValuesMap.set(value.title, false);
        });
    }

    private initializePartners(partnersMap: Map<number, Partner>) {
        this.partnersMap = new Map(partnersMap);
    }

    private initializeProjectsFiltered(projectsMap: Map<number, Project>) {
        const projectsMapFiltered = new Map<number, Project>();

        Array.from(projectsMap.values()).filter(project => {
            return this.filterProject(project);
        }).forEach(project => {
            projectsMapFiltered.set(project.id, project);
        });

        // Re-instantiate to trigger change detection
        this.projectsMapFiltered = new Map(projectsMapFiltered);
    }

    private initializeValueMaps() {
        this.selectableGoalsMap.forEach((value: SelectableGoal, key: number) => {
            this.goalsValuesMap.set(value.title, value.selected);
        });
        this.selectableCompetenciesMap.forEach((value: SelectableCompetency, key: number) => {
            this.competenciesValuesMap.set(value.title, value.selected);
        });

        // Re-instantiate to trigger change detection
        this.goalsValuesMap = new Map(this.goalsValuesMap);
        this.competenciesValuesMap = new Map(this.competenciesValuesMap);
    }

    protected initializeMaterial() {
        this.materialIconService.initializeIcons(this.iconRegistry, this.sanitizer);
    }

    //
    // Actions
    //

    onMenuItemClicked(menuItem: string) {
        switch (menuItem) {
            case 'filter': {
                this.searchPanelState = this.searchPanelState === 'opened' ? 'closed' : 'opened';
                break;
            }
            case 'filter-reset': {
                this.initializeFilters();

                // Initialize values for filter panel and re-filter
                this.initializeValueMaps();
                this.initializeProjectsFiltered(this.projectsMap);
                break;
            }
            default: {
                break;
            }
        }
    }

    onGoalsSelected(event: Map<string, boolean>) {
        this.selectableGoalsMap.forEach((value: SelectableGoal, key: number) => {
            value.selected = event.has(value.title) && event.get(value.title);
        });

        this.initializeProjectsFiltered(this.projectsMap);
    }

    onCompetenciesSelected(event: any) {
        this.selectableCompetenciesMap.forEach((value: SelectableCompetency, key: number) => {
            value.selected = event.has(value.title) && event.get(value.title);
        });
        this.initializeProjectsFiltered(this.projectsMap);
    }

    onPriceLimitSelected(event: number) {
        this.priceLimit = event;
        this.initializeProjectsFiltered(this.projectsMap);
    }

    //
    //
    //

    private filterProject(project: Project): boolean {
        const projectGoals = [];
        project.sustainableDevelopmentGoalIds.forEach(id => {
            const goal = this.selectableGoalsMap.get(id);
            if (goal != null) {
                projectGoals.push(goal.title);
            }
        });
        const projectCompetencies = [];
        project.competencyIds.forEach(id => {
            const competency = this.selectableCompetenciesMap.get(id);
            if (competency != null) {
                projectCompetencies.push(competency.title);
            }
        });

        const noGoalSelected = !Array.from(this.selectableGoalsMap.values()).some(selectableGoal => {
            return selectableGoal.selected;
        });
        const matchesGoal = noGoalSelected || projectGoals.some(projectGoal => {
            return Array.from(this.selectableGoalsMap.values()).some(selectableGoal => {
                return selectableGoal.selected && selectableGoal.title === projectGoal;
            });
        });

        const noCompetencySelected = !Array.from(this.selectableCompetenciesMap.values()).some(selectableCompetency => {
            return selectableCompetency.selected;
        });
        const matchesCompetency = noCompetencySelected || projectCompetencies.some(projectCompetency => {
            return Array.from(this.selectableCompetenciesMap.values()).some(selectableCompetency => {
                return selectableCompetency.selected && selectableCompetency.title === projectCompetency;
            });
        });

        const matchesPriceLimit = this.priceLimit === 0 || project.costPerChild <= this.priceLimit;

        return matchesGoal && matchesCompetency && matchesPriceLimit;
    }

    private findEntities(forceReload = false) {
        this.projectService.fetchProjects(forceReload);
        this.goalService.fetchGoals(forceReload);
        this.competencyService.fetchCompetencies(forceReload);
        this.partnerService.fetchPartners(forceReload);
    }

    //
    // Helpers
    //

    getCostPerChildMax(): number {
        let costPerChildMax = Number.MIN_VALUE;
        this.projectsMap.forEach((value: Project, key: number) => {
            if (value.costPerChild > costPerChildMax) {
                costPerChildMax = value.costPerChild;
            }
        });

        return costPerChildMax;
    }

    getCostPerChildMin(): number {
        let costPerChildMin = Number.MAX_VALUE;
        this.projectsMap.forEach((value: Project, key: number) => {
            if (value.costPerChild < costPerChildMin) {
                costPerChildMin = value.costPerChild;
            }
        });

        return costPerChildMin;
    }

    private initializeFilters() {
        this.selectableGoalsMap.forEach((value: SelectableGoal, key: number) => {
            value.selected = false;
        });
        this.selectableCompetenciesMap.forEach((value: SelectableCompetency, key: number) => {
            value.selected = false;
        });
        this.priceLimit = this.getCostPerChildMax();
    }
}
