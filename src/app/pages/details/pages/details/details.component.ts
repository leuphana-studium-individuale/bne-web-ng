import {Component, OnDestroy, OnInit} from '@angular/core';
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

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

    /** ID passed as an argument */
    id: number;

    project: Project;
    projectGoals = [];
    projectCompetencies = [];
    partner: Partner;

    projectsMap: Map<number, Project> = new Map<number, Project>();
    goalsMap: Map<number, Goal> = new Map<number, Goal>();
    competenciesMap: Map<number, Competency> = new Map<number, Competency>();
    partnersMap: Map<number, Partner> = new Map<number, Partner>();

    // Colors
    public goalsBackgroundColor = 'transparent';
    public competenciesBackgroundColor = 'transparent';

    /** Helper subject used to finish other subscriptions */
    public unsubscribeSubject = new Subject();

    constructor(private projectService: ProjectService,
                private goalService: GoalService,
                private competencyService: CompetencyService,
                private partnerService: PartnerService,
                private materialColorService: MaterialColorService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.initializeSubscriptions();
        this.initializeMaterialColors();

        this.route.params.subscribe(() => {
            if (this.route.snapshot != null) {
                this.id = +this.route.snapshot.paramMap.get('id');
                console.log(`id ${this.id}`);
                this.findEntities();
            }
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
        this.projectsMap = projects;

        this.initializeProject(this.projectsMap);
        this.initializeGoals(this.goalsMap);
        this.initializeCompetencies(this.competenciesMap);
        this.initializePartner(this.partnersMap);
    }

    onGoalsUpdated(goals: Map<number, Goal>) {
        this.goalsMap = goals;

        this.initializeProject(this.projectsMap);
        this.initializeGoals(this.goalsMap);
        this.initializeCompetencies(this.competenciesMap);
        this.initializePartner(this.partnersMap);
    }

    onCompetenciesUpdated(competencies: Map<number, Competency>) {
        this.competenciesMap = competencies;

        this.initializeProject(this.projectsMap);
        this.initializeGoals(this.goalsMap);
        this.initializeCompetencies(this.competenciesMap);
        this.initializePartner(this.partnersMap);
    }

    onPartnersUpdated(partners: Map<number, Partner>) {
        this.partnersMap = partners;

        this.initializeProject(this.projectsMap);
        this.initializeGoals(this.goalsMap);
        this.initializeCompetencies(this.competenciesMap);
        this.initializePartner(this.partnersMap);
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

    private initializeProject(projectsMap: Map<number, Project>) {
        if (projectsMap.has(this.id)) {
            this.project = projectsMap.get(this.id);
        } else {
            this.router.navigate(['/']);
        }
    }

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

    private initializePartner(partnersMap: Map<number, Partner>) {
        if (this.project != null && partnersMap.has(this.id)) {
            this.partner = partnersMap.get(this.project.partnerId);
        }
    }

    private initializeMaterialColors() {
        this.goalsBackgroundColor = this.materialColorService.primary;
        this.competenciesBackgroundColor = this.materialColorService.accent;
    }


//
// this.project.competencyIds.forEach(id => {
//     const competency = this.competenciesMap.get(id);
//     if (competency != null) {
//         this.projectCompetencies.push(competency.title);
//     }
// });

    //
    // Actions
    //

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

    //
    //
    //

    private findEntities(forceReload = false) {
        this.projectService.fetchProjects(forceReload);
        this.goalService.fetchGoals(forceReload);
        this.competencyService.fetchCompetencies(forceReload);
        this.partnerService.fetchPartners(forceReload);
    }

    onCallButtonClicked(phone: string) {
        const link = `tel:${phone}`;

        window.location.href = link;
    }

    onMailButtonClicked(mail: string) {
        const link = `mailto:`
            + mail
            + `?subject=${escape('Anfrage BNE')}`;

        window.location.href = link;
    }
}
