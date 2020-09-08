import {Component, OnDestroy, OnInit} from '@angular/core';
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
import {Router} from '@angular/router';
import {FilterService} from '../../../../core/entity/services/filter.service';

/**
 * Extends goal by attributes to make it selectable
 */
export class SelectableGoal extends Goal {
    /** Whether the goal is selected */
    selected = true;
    /** Whether the goal is selectable */
    disabled = false;

    /**
     * Constructor
     * @param goal goal
     */
    constructor(goal: Goal) {
        super(goal.id, goal.title, goal.icon, goal.description);
    }
}

/**
 * Extends competency by attributes to make it selectable
 */
export class SelectableCompetency extends Competency {
    /** Whether the competency is selected */
    selected = true;
    /** Whether the competency is selectable */
    disabled = false;

    /**
     * Constructor
     * @param competency competency
     */
    constructor(competency: Competency) {
        super(competency.id, competency.title, competency.description);
    }
}

/**
 * Displays overview page
 */
@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
    animations: [
        trigger('searchPanelAnimation', [
            state('open', style({
                opacity: '1',
                overflow: 'hidden',
                height: '*'
            })),
            state('closed', style({
                opacity: '0',
                overflow: 'hidden',
                height: '0px'
            })),
            transition('* => *', animate('400ms ease-in-out'))
        ])
    ]
})
export class OverviewComponent implements OnInit, OnDestroy {

    /** Map of projects */
    public projectsMap = new Map<number, Project>();
    /** Array of filtered projects */
    public projectsMapFiltered = new Map<number, Project>();
    /** Map of goals */
    selectableGoalsMap = new Map<number, SelectableGoal>();
    /** Map of competencies */
    selectableCompetenciesMap = new Map<number, SelectableCompetency>();
    /** Map of partners */
    partnersMap = new Map<number, Partner>();

    /** Filter values for goals */
    goalsValuesMap: Map<string, [string, boolean, boolean]> = new Map<string, [string, boolean, boolean]>();
    /** Filter values for competencies */
    competenciesValuesMap: Map<string, [string, boolean, boolean]> = new Map<string, [string, boolean, boolean]>();
    /** Filter value for costs per child */
    costsPerChildLimit = 0;
    /** Filter value for effort */
    lessThanOneHour: [boolean, boolean] = [true, false];
    /** Filter value for effort */
    betweenOneAndTwoHours: [boolean, boolean] = [true, false];
    /** Filter value for effort */
    betweenTwoAndFourHours: [boolean, boolean] = [true, false];
    /** Filter value for effort */
    betweenOneAndTwoDays: [boolean, boolean] = [true, false];
    /** Filter value for effort */
    moreThanTwoDays: [boolean, boolean] = [true, false];

    /** Background color for goal tags */
    public goalsBackgroundColor = 'transparent';
    /** Background color for competencies tags */
    public competenciesBackgroundColor = 'transparent';
    /** Color for cost-per-child slider */
    public costPerChildColor = 'transparent';

    /** State of the search panel */
    searchPanelState = 'closed';

    /** Helper subject used to finish other subscriptions */
    public unsubscribeSubject = new Subject();

    /**
     * Constructor
     * @param competencyService competency service
     * @param filterService filter service
     * @param goalService goal service
     * @param iconRegistry icon registry
     * @param materialColorService material color service
     * @param materialIconService material icon service
     * @param partnerService partner service
     * @param projectService project service
     * @param router router
     * @param sanitizer sanitizer
     */
    constructor(private competencyService: CompetencyService,
                private filterService: FilterService,
                private goalService: GoalService,
                private iconRegistry: MatIconRegistry,
                private materialColorService: MaterialColorService,
                private materialIconService: MaterialIconService,
                private partnerService: PartnerService,
                private projectService: ProjectService,
                private router: Router,
                private sanitizer: DomSanitizer) {
    }

    //
    // Lifecycle hooks
    //

    /**
     * Handles on-init lifecycle phase
     */
    ngOnInit() {
        this.initializeSubscriptions();

        this.initializeMaterial();
        this.initializeMaterialColors();
        this.findEntities();
    }

    /**
     * Handles on-destroy lifecycle phase
     */
    ngOnDestroy() {
        this.unsubscribeSubject.next();
        this.unsubscribeSubject.complete();
    }

    //
    // Initialization
    //

    /**
     * Initializes subscriptions
     */
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

    /**
     * Initializes projects
     */
    private initializeProjects(projectsMap: Map<number, Project>) {
        this.projectsMap = new Map(projectsMap);
    }

    /**
     * Initializes goals
     */
    private initializeGoals(goalsMap: Map<number, Goal>) {
        this.selectableGoalsMap = new Map<number, SelectableGoal>();
        goalsMap.forEach((value: Goal, key: number) => {
            this.selectableGoalsMap.set(key, new SelectableGoal(value));
        });

        this.initializeFilters();
    }

    /**
     * Initializes competencies
     */
    private initializeCompetencies(competenciesMap: Map<number, Competency>) {
        this.selectableCompetenciesMap = new Map<number, SelectableCompetency>();
        competenciesMap.forEach((value: Competency, key: number) => {
            this.selectableCompetenciesMap.set(key, new SelectableCompetency(value));
        });

        this.initializeFilters();
    }

    /**
     * Initializes partners
     */
    private initializePartners(partnersMap: Map<number, Partner>) {
        this.partnersMap = new Map(partnersMap);
    }

    private initializeProjectsFiltered(projectsMap: Map<number, Project>) {
        const projectsMapFiltered = new Map<number, Project>();

        Array.from(projectsMap.values()).filter(project => {
            return this.filterService.filterProject(project, this.selectableGoalsMap, this.selectableCompetenciesMap,
                this.costsPerChildLimit, this.lessThanOneHour, this.betweenOneAndTwoHours,
                this.betweenTwoAndFourHours, this.betweenOneAndTwoDays, this.moreThanTwoDays);
        }).forEach(project => {
            projectsMapFiltered.set(project.id, project);
        });

        // Re-instantiate to trigger change detection
        this.projectsMapFiltered = new Map(projectsMapFiltered);
    }

    /**
     * Initializes filter
     */
    private initializeFilters() {
        this.selectableGoalsMap.forEach((value: SelectableGoal, key: number) => {
            const existsInProjects = Array.from(this.projectsMap.values()).some(p => {
                return p.sustainableDevelopmentGoalIds.some(id => {
                    return value.id === id;
                });
            });

            value.selected = false;
            value.disabled = !existsInProjects;
        });
        this.selectableCompetenciesMap.forEach((value: SelectableCompetency, key: number) => {
            const existsInProjects = Array.from(this.projectsMap.values()).some(p => {
                return p.competencyIds.some(id => {
                    return value.id === id;
                });
            });

            value.selected = false;
            value.disabled = !existsInProjects;
        });

        // Transform selectable maps to value maps
        this.selectableGoalsMap.forEach((value: SelectableGoal, key: number) => {
            this.goalsValuesMap.set(value.title, [value.icon, value.selected, value.disabled]);
        });
        this.selectableCompetenciesMap.forEach((value: SelectableCompetency, key: number) => {
            this.competenciesValuesMap.set(value.title, [null, value.selected, value.disabled]);
        });

        // Re-instantiate to trigger change detection
        this.goalsValuesMap = new Map(this.goalsValuesMap);
        this.competenciesValuesMap = new Map(this.competenciesValuesMap);

        this.costsPerChildLimit = this.getCostPerChildMax();
        const lessThanOneHourExists = Array.from(this.projectsMap.values()).some(p => {
            return 0 <= p.effortInHours && p.effortInHours < 1;
        });
        const betweenOneAndTwoHoursExists = Array.from(this.projectsMap.values()).some(p => {
            return 1 <= p.effortInHours && p.effortInHours < 2;
        });
        const betweenTwoAndFourHoursExists = Array.from(this.projectsMap.values()).some(p => {
            return 2 <= p.effortInHours && p.effortInHours < 4;
        });
        const betweenOneAndTwoDaysExists = Array.from(this.projectsMap.values()).some(p => {
            return 4 <= p.effortInHours && p.effortInHours < 8;
        });
        const moreThanTwoDaysExists = Array.from(this.projectsMap.values()).some(p => {
            return 8 <= p.effortInHours;
        });

        this.lessThanOneHour = [false, !lessThanOneHourExists];
        this.betweenOneAndTwoHours = [false, !betweenOneAndTwoHoursExists];
        this.betweenTwoAndFourHours = [false, !betweenTwoAndFourHoursExists];
        this.betweenOneAndTwoDays = [false, !betweenOneAndTwoDaysExists];
        this.moreThanTwoDays = [false, !moreThanTwoDaysExists];
    }

    /**
     * Initializes material icons
     */
    private initializeMaterial() {
        // this.materialIconService.initializeIcons(this.iconRegistry, this.sanitizer);
    }

    /**
     * Initializes material colors
     */
    private initializeMaterialColors() {
        this.goalsBackgroundColor = this.materialColorService.primary;
        this.competenciesBackgroundColor = this.materialColorService.accent;
        this.costPerChildColor = this.materialColorService.primary;
    }

    //
    // Events
    //

    /**
     * Handles projects being loaded
     * @param projects projects
     */
    onProjectsUpdated(projects: Map<number, Project>) {
        this.initializeProjects(projects);
        this.initializeFilters();
        this.initializeProjectsFiltered(this.projectsMap);
    }

    /**
     * Handles goals being loaded
     * @param goals goals
     */
    onGoalsUpdated(goals: Map<number, Goal>) {
        this.initializeGoals(goals);
        this.initializeFilters();
        this.initializeProjectsFiltered(this.projectsMap);
    }

    /**
     * Handles competencies being loaded
     * @param competencies competencies
     */
    onCompetenciesUpdated(competencies: Map<number, Competency>) {
        this.initializeCompetencies(competencies);
        this.initializeFilters();
        this.initializeProjectsFiltered(this.projectsMap);
    }

    /**
     * Handles partners being loaded
     * @param partners partners
     */
    onPartnersUpdated(partners: Map<number, Partner>) {
        this.initializePartners(partners);
        this.initializeFilters();
        this.initializeProjectsFiltered(this.projectsMap);
    }

    //
    // Actions
    //

    /**
     * Handles click on menu item
     * @param menuItem menu item
     */
    onMenuItemClicked(menuItem: string) {
        switch (menuItem) {
            case 'filter': {
                this.searchPanelState = this.searchPanelState === 'opened' ? 'closed' : 'opened';
                break;
            }
            case 'filter-reset': {
                this.initializeFilters();
                this.initializeProjectsFiltered(this.projectsMap);
                break;
            }
            default: {
                break;
            }
        }
    }

    /**
     * Handles details button being clicked
     * @param event project ID
     */
    onProjectClicked(event: number) {
        this.router.navigate([`/details/${event}`]);
    }

    /**
     * Handles selection of goals
     * @param event map of goals
     */
    onGoalsSelected(event: Map<string, [string, boolean, boolean]>) {
        this.selectableGoalsMap.forEach((value: SelectableGoal, key: number) => {
            value.selected = event.has(value.title) && event.get(value.title)[1];
        });

        this.initializeProjectsFiltered(this.projectsMap);
    }

    /**
     * Handles selection of competencies
     * @param event map of competencies
     */
    onCompetenciesSelected(event: Map<string, [string, boolean, boolean]>) {
        this.selectableCompetenciesMap.forEach((value: SelectableCompetency, key: number) => {
            value.selected = event.has(value.title) && event.get(value.title)[1];
        });
        this.initializeProjectsFiltered(this.projectsMap);
    }

    /**
     * Handles selection of a price limit
     * @param event price limit
     */
    onPriceLimitSelected(event: number) {
        this.costsPerChildLimit = event;
        this.initializeProjectsFiltered(this.projectsMap);
    }

    /**
     * Handles selection of effort filter
     * @param event filter value
     */
    onLessThanOneHourChanged(event: [boolean, boolean]) {
        this.lessThanOneHour = event;
        this.initializeProjectsFiltered(this.projectsMap);
    }

    /**
     * Handles selection of effort filter
     * @param event filter value
     */
    onBetweenOneAndTwoHoursChanged(event: [boolean, boolean]) {
        this.betweenOneAndTwoHours = event;
        this.initializeProjectsFiltered(this.projectsMap);
    }

    /**
     * Handles selection of effort filter
     * @param event filter value
     */
    onBetweenTwoAndFourHoursChanged(event: [boolean, boolean]) {
        this.betweenTwoAndFourHours = event;
        this.initializeProjectsFiltered(this.projectsMap);
    }

    /**
     * Handles selection of effort filter
     * @param event filter value
     */
    onBetweenOneAndTwoDaysChanged(event: [boolean, boolean]) {
        this.betweenOneAndTwoDays = event;
        this.initializeProjectsFiltered(this.projectsMap);
    }

    /**
     * Handles selection of effort filter
     * @param event filter value
     */
    onMoreThanTwoDaysChanged(event: [boolean, boolean]) {
        this.moreThanTwoDays = event;
        this.initializeProjectsFiltered(this.projectsMap);
    }

    //
    // Storage
    //

    /**
     * Finds entities
     * @param forceReload force reload
     */
    private findEntities(forceReload = false) {
        this.projectService.fetchProjects(forceReload);
        this.goalService.fetchGoals(forceReload);
        this.competencyService.fetchCompetencies(forceReload);
        this.partnerService.fetchPartners(forceReload);
    }

    //
    // Helpers
    //

    /**
     * Gets maximum costs per child
     */
    getCostPerChildMax(): number {
        let costPerChildMax = Number.MIN_VALUE;
        this.projectsMap.forEach((value: Project, key: number) => {
            if (value.costsPerChild > costPerChildMax) {
                costPerChildMax = value.costsPerChild;
            }
        });

        return costPerChildMax;
    }

    /**
     * Gets minimum costs per child
     */
    getCostPerChildMin(): number {
        let costPerChildMin = Number.MAX_VALUE;
        this.projectsMap.forEach((value: Project, key: number) => {
            if (value.costsPerChild < costPerChildMin) {
                costPerChildMin = value.costsPerChild;
            }
        });

        return costPerChildMin;
    }
}
