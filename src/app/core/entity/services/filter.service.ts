import {Injectable} from '@angular/core';
import {Project} from '../model/project.model';
import {SelectableCompetency, SelectableGoal} from '../../../pages/overview/pages/overview/overview.component';

/**
 * Handles filtering
 */
@Injectable({
    providedIn: 'root'
})
export class FilterService {

    /**
     * Filters a project based on a list of criteria
     * @param project project
     * @param selectableGoalsMap selectable goals map
     * @param selectableCompetenciesMap selectable competencies map
     * @param costsPerChildLimit costs per child limit
     * @param lessThanOneHour lessThanOneHour
     * @param betweenOneAndTwoHours betweenOneAndTwoHours
     * @param betweenTwoAndFourHours betweenTwoAndFourHours
     * @param betweenOneAndTwoDays betweenOneAndTwoDays
     * @param moreThanTwoDays moreThanTwoDays
     */
    filterProject(project: any,
                  selectableGoalsMap = new Map<number, SelectableGoal>(),
                  selectableCompetenciesMap = new Map<number, SelectableCompetency>(),
                  costsPerChildLimit: number,
                  lessThanOneHour: [boolean, boolean],
                  betweenOneAndTwoHours: [boolean, boolean],
                  betweenTwoAndFourHours: [boolean, boolean],
                  betweenOneAndTwoDays: [boolean, boolean],
                  moreThanTwoDays: [boolean, boolean]) {
        const matchesGoal = this.checkGoalMatch(project, selectableGoalsMap);
        const matchesCompetency = this.checkCompetencyMatch(project, selectableCompetenciesMap);
        const matchesPriceLimit = project.costsPerChild <= costsPerChildLimit;
        const matchesDuration = this.checkDurationMatch(project, lessThanOneHour, betweenOneAndTwoHours, betweenTwoAndFourHours,
            betweenOneAndTwoDays, moreThanTwoDays);

        return matchesGoal && matchesCompetency && matchesPriceLimit && matchesDuration;
    }

    /**
     * Checks if the given project contains any of the goals selected in the filter
     * @param project project
     * @param selectableGoalsMap selectable goals map
     */
    private checkGoalMatch(project: Project, selectableGoalsMap: Map<number, SelectableGoal>): boolean {
        let matchesGoals = true;
        if (this.isAnyGoalSelected(selectableGoalsMap)) {
            const projectGoals = [];
            project.sustainableDevelopmentGoalIds.forEach(id => {
                const goal = selectableGoalsMap.get(id);
                if (goal != null) {
                    projectGoals.push(goal.title);
                }
            });

            matchesGoals = projectGoals.some(projectGoal => {
                return Array.from(selectableGoalsMap.values()).some(selectableGoal => {
                    return selectableGoal.selected && selectableGoal.title === projectGoal;
                });
            });
        }
        return matchesGoals;
    }

    /**
     * Checks if the given project contains any of the competencies selected in the filter
     * @param project project
     * @param selectableCompetenciesMap selectable competencies map
     */
    private checkCompetencyMatch(project: Project, selectableCompetenciesMap: Map<number, SelectableCompetency>): boolean {
        let matchesCompetencies = true;
        if (this.isAnyCompetencySelected(selectableCompetenciesMap)) {
            const projectCompetencies = [];
            project.competencyIds.forEach(id => {
                const competency = selectableCompetenciesMap.get(id);
                if (competency != null) {
                    projectCompetencies.push(competency.title);
                }
            });

            matchesCompetencies = projectCompetencies.some(projectCompetency => {
                return Array.from(selectableCompetenciesMap.values()).some(selectableCompetency => {
                    return selectableCompetency.selected && selectableCompetency.title === projectCompetency;
                });
            });
        }

        return matchesCompetencies;
    }

    /**
     * Checks if the given project contains any of the durations selected in the filter
     * @param project project
     * @param lessThanOneHour lessThanOneHour
     * @param betweenOneAndTwoHours betweenOneAndTwoHours
     * @param betweenTwoAndFourHours betweenTwoAndFourHours
     * @param betweenOneAndTwoDays betweenOneAndTwoDays
     * @param moreThanTwoDays moreThanTwoDays
     */
    private checkDurationMatch(project: Project,
                               lessThanOneHour: [boolean, boolean],
                               betweenOneAndTwoHours: [boolean, boolean],
                               betweenTwoAndFourHours: [boolean, boolean],
                               betweenOneAndTwoDays: [boolean, boolean],
                               moreThanTwoDays: [boolean, boolean]): boolean {
        let matchesDuration = true;
        if (this.isAnyDurationSelected(lessThanOneHour, betweenOneAndTwoHours, betweenTwoAndFourHours,
            betweenOneAndTwoDays, moreThanTwoDays)) {
            matchesDuration = (lessThanOneHour[0] && 0 <= project.effortInHours && project.effortInHours < 1)
                || (betweenOneAndTwoHours[0] && 1 <= project.effortInHours && project.effortInHours < 2)
                || (betweenTwoAndFourHours[0] && 2 <= project.effortInHours && project.effortInHours < 4)
                || (betweenOneAndTwoDays[0] && 4 <= project.effortInHours && project.effortInHours < 8)
                || (moreThanTwoDays[0] && 8 <= project.effortInHours);
        }

        return matchesDuration;
    }

    //
    //
    //

    /**
     * Checks if any goal filter is set
     * @param selectableGoalsMap selectable goals map
     */
    private isAnyGoalSelected(selectableGoalsMap: Map<number, SelectableGoal>) {
        return Array.from(selectableGoalsMap.values()).some(goal => {
            return goal.selected;
        });
    }

    /**
     * Checks if any goal filter is set
     * @param selectableCompetenciesMap selectable competencies map
     */
    private isAnyCompetencySelected(selectableCompetenciesMap: Map<number, SelectableCompetency>) {
        return Array.from(selectableCompetenciesMap.values()).some(competency => {
            return competency.selected;
        });
    }

    /**
     * Checks if any duration filter is set
     * @param lessThanOneHour lessThanOneHour
     * @param betweenOneAndTwoHours betweenOneAndTwoHours
     * @param betweenTwoAndFourHours betweenTwoAndFourHours
     * @param betweenOneAndTwoDays betweenOneAndTwoDays
     * @param moreThanTwoDays moreThanTwoDays
     */
    private isAnyDurationSelected(lessThanOneHour: [boolean, boolean],
                                  betweenOneAndTwoHours: [boolean, boolean],
                                  betweenTwoAndFourHours: [boolean, boolean],
                                  betweenOneAndTwoDays: [boolean, boolean],
                                  moreThanTwoDays: [boolean, boolean]) {
        return lessThanOneHour[0] ||
            betweenOneAndTwoHours[0] ||
            betweenTwoAndFourHours[0] ||
            betweenOneAndTwoDays[0] ||
            moreThanTwoDays[0];
    }
}
