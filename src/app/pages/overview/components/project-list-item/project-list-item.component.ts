import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project} from '../../../../core/entity/model/project.model';
import {Goal} from '../../../../core/entity/model/goal.model';
import {Partner} from '../../../../core/entity/model/partner.model';
import {Competency} from '../../../../core/entity/model/competency.model';
import {Swatch, VibrantPalette} from '../../../../core/ui/model/vibrant-palette';
// @ts-ignore
import Vibrant = require('node-vibrant');

/**
 * Displays project overiew
 */
@Component({
    selector: 'app-project-list-item',
    templateUrl: './project-list-item.component.html',
    styleUrls: ['./project-list-item.component.scss']
})
export class ProjectListItemComponent implements OnInit {

    /** Project to be displayed */
    @Input() project: Project;
    /** Map of goals */
    @Input() goalsMap: Map<number, Goal>;
    /** Background color for goal tags */
    @Input() goalsBackground = 'transparent';
    /** Map of competencies */
    @Input() competenciesMap: Map<number, Competency>;
    /** Background color for competencies tags */
    @Input() competenciesBackground = 'transparent';
    /** Map of partners */
    @Input() partnersMap: Map<string, Partner>;

    /** List of project goals */
    projectGoals = [];
    /** List of project icons */
    projectIcons = [];
    /** List of project competencies */
    projectCompetencies = [];

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
                this.projectIcons.push(goal.icon);
            }
        });

        this.project.competencyIds.forEach(id => {
            const competency = this.competenciesMap.get(id);
            if (competency != null) {
                this.projectCompetencies.push(competency.title);
            }
        });

        // if (this.project.bannerUrl != null && this.project.bannerUrl !== '') {
        //     this.getPalette(this.project.bannerUrl).then(palette => {
        //         this.goalsBackground = this.getColor(palette.lightVibrant as Swatch).toString();
        //         this.competenciesBackground = this.getColor(palette.lightMuted as Swatch).toString();
        //     });
        // }
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
                    resolve(ProjectListItemComponent.convertToVibrantPalette(result));
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
