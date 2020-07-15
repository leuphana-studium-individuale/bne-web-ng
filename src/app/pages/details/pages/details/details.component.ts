import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {ProjectService} from '../../../../core/entity/services/project.service';
import {filter, takeUntil} from 'rxjs/operators';
import {Project} from '../../../../core/entity/model/project.model';
import {GoalService} from '../../../../core/entity/services/goal.service';
import {CompetencyService} from '../../../../core/entity/services/competency.service';
import {PartnerService} from '../../../../core/entity/services/partner.service';
import {Goal} from '../../../../core/entity/model/goal.model';
import {Competency} from '../../../../core/entity/model/competency.model';
import {Partner} from '../../../../core/entity/model/partner.model';
import {MaterialColorService} from '../../../../core/ui/services/material-color.service';
import {Swatch, VibrantPalette} from '../../../../core/ui/model/vibrant-palette';
// @ts-ignore
import Vibrant = require('node-vibrant');

/**
 * Displays details page
 */
@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

    /** ID passed as an argument */
    id: number;

    /** Project to be displayed */
    project: Project;
    /** Project goals */
    projectGoals = [];
    /** Project competencies */
    projectCompetencies = [];
    /** Project partner */
    partner: Partner;

    /** Map of projects */
    projectsMap: Map<number, Project> = new Map<number, Project>();
    /** Map of goals */
    goalsMap: Map<number, Goal> = new Map<number, Goal>();
    /** Map of competencies */
    competenciesMap: Map<number, Competency> = new Map<number, Competency>();
    /** Map of partners */
    partnersMap: Map<number, Partner> = new Map<number, Partner>();

    /** Background color for goal tags */
    public goalsBackgroundColor = 'transparent';
    /** Background color for competencies tags */
    public competenciesBackgroundColor = 'transparent';

    /** Helper subject used to finish other subscriptions */
    public unsubscribeSubject = new Subject();

    /**
     * Converts palette into a vibrant palette object
     * @param palette palette
     */
    static convertToVibrantPalette(palette: any): VibrantPalette {
        const vibrantPalette = new VibrantPalette();
        vibrantPalette.vibrant.rgb = palette.Vibrant.rgb;
        vibrantPalette.darkVibrant.rgb = palette.DarkVibrant.rgb;
        vibrantPalette.lightVibrant.rgb = palette.LightVibrant.rgb;
        vibrantPalette.muted.rgb = palette.Muted.rgb;
        vibrantPalette.darkMuted.rgb = palette.DarkMuted.rgb;
        vibrantPalette.lightMuted.rgb = palette.LightMuted.rgb;

        return vibrantPalette;
    }

    /**
     * Constructor
     * @param competencyService competency service
     * @param goalService goal service
     * @param materialColorService material color service
     * @param partnerService partner service
     * @param projectService project service
     * @param route route
     * @param router router
     */
    constructor(private competencyService: CompetencyService,
                private goalService: GoalService,
                private materialColorService: MaterialColorService,
                private partnerService: PartnerService,
                private projectService: ProjectService,
                private route: ActivatedRoute,
                private router: Router) {
    }

    //
    // Lifecycle hooks
    //

    /**
     * Handles on-init lifecycle phase
     */
    ngOnInit() {
        this.initializeSubscriptions();
        this.initializeMaterialColors();

        this.route.params.subscribe(() => {
            if (this.route.snapshot != null) {
                this.id = +this.route.snapshot.paramMap.get('id');
                this.findEntities();
            }
        });
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
     * Initializes project
     */
    private initializeProject(projectsMap: Map<number, Project>) {
        if (projectsMap.has(this.id)) {
            this.project = projectsMap.get(this.id);
            if (this.project.bannerUrl != null && this.project.bannerUrl !== '') {
                this.getPalette(this.project.bannerUrl).then(palette => {
                    this.goalsBackgroundColor = this.getColor(palette.lightVibrant as Swatch).toString();
                    this.competenciesBackgroundColor = this.getColor(palette.lightMuted as Swatch).toString();
                });
            }
        } else {
            this.router.navigate(['/']);
        }
    }

    /**
     * Initializes goals
     */
    private initializeGoals(goalsMap: Map<number, Goal>) {
        if (this.project != null) {
            this.projectGoals = [];
            this.project.sustainableDevelopmentGoalIds.forEach(id => {
                const goal = goalsMap.get(id);
                if (goal != null) {
                    this.projectGoals.push(goal.title);
                }
            });
        }
    }

    /**
     * Initializes competencies
     */
    private initializeCompetencies(competenciesMap: Map<number, Competency>) {
        if (this.project != null) {
            this.projectCompetencies = [];
            this.project.competencyIds.forEach(id => {
                const competency = competenciesMap.get(id);
                if (competency != null) {
                    this.projectCompetencies.push(competency.title);
                }
            });
        }
    }

    /**
     * Initializes partner
     */
    private initializePartner(partnersMap: Map<number, Partner>) {
        if (this.project != null && partnersMap.has(this.id)) {
            this.partner = partnersMap.get(this.project.partnerId);
        }
    }

    /**
     * Initializes material colors
     */
    private initializeMaterialColors() {
        this.goalsBackgroundColor = this.materialColorService.primary;
        this.competenciesBackgroundColor = this.materialColorService.accent;
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
            case 'back': {
                this.router.navigate(['/overview']);
                break;
            }
            default: {
                break;
            }
        }
    }

    /**
     * Handles click on call button
     * @param phone phone number
     */
    onCallButtonClicked(phone: string) {
        window.location.href = `tel:${phone}`;
    }

    /**
     * Handles click on mail button
     * @param mail mail address
     */
    onMailButtonClicked(mail: string) {
        window.location.href = `mailto:${mail}?subject=${escape('Anfrage BNE')}`;
    }

    /**
     * Handles projects being loaded
     * @param projects projects
     */
    onProjectsUpdated(projects: Map<number, Project>) {
        this.projectsMap = projects;

        this.initializeProject(this.projectsMap);
        this.initializeGoals(this.goalsMap);
        this.initializeCompetencies(this.competenciesMap);
        this.initializePartner(this.partnersMap);
    }

    /**
     * Handles goals being loaded
     * @param goals goals
     */
    onGoalsUpdated(goals: Map<number, Goal>) {
        this.goalsMap = goals;

        this.initializeProject(this.projectsMap);
        this.initializeGoals(this.goalsMap);
        this.initializeCompetencies(this.competenciesMap);
        this.initializePartner(this.partnersMap);
    }

    /**
     * Handles competencies being loaded
     * @param competencies competencies
     */
    onCompetenciesUpdated(competencies: Map<number, Competency>) {
        this.competenciesMap = competencies;

        this.initializeProject(this.projectsMap);
        this.initializeGoals(this.goalsMap);
        this.initializeCompetencies(this.competenciesMap);
        this.initializePartner(this.partnersMap);
    }

    /**
     * Handles partners being loaded
     * @param partners partners
     */
    onPartnersUpdated(partners: Map<number, Partner>) {
        this.partnersMap = partners;

        this.initializeProject(this.projectsMap);
        this.initializeGoals(this.goalsMap);
        this.initializeCompetencies(this.competenciesMap);
        this.initializePartner(this.partnersMap);
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
    // Helper
    //

    /**
     * Determines palette by a given image URL
     * @param imageUrl image URL
     */
    private getPalette(imageUrl: string): Promise<VibrantPalette> {
        return new Promise((resolve, reject) => {
            if (imageUrl != null) {
                Vibrant.from(imageUrl).getPalette((err, result) => {
                    resolve(DetailsComponent.convertToVibrantPalette(result));
                }).then(() => {
                });
            } else {
                reject();
            }
        });
    }

    /**
     * Converts a swatch into an rgb color string
     * @param swatch swatch
     */
    private getColor(swatch: Swatch) {
        return `rgb(${swatch.rgb[0]},${swatch.rgb[1]},${swatch.rgb[2]})`;
    }
}
