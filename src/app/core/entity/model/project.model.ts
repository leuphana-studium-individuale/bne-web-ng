export class Project {
    title: string;
    description: string;
    costPerChild: number;
    costTotal: number;
    effortInHours: number;
    durationInDays: number;
    logoName: string;
    url: string;

    sustainableDevelopmentGoalIds: string[];
    competencyIds: string[];
    partnerId: string;

    constructor(title: string, description: string, costPerChild: number, costTotal: number, effortInHours: number, durationInDays: number,
                logoName: string, url: string, sustainableDevelopmentGoalIds: string[], competencyIds: string[], partnerId: string) {
        this.title = title;
        this.description = description;
        this.costPerChild = costPerChild;
        this.costTotal = costTotal;
        this.effortInHours = effortInHours;
        this.durationInDays = durationInDays;
        this.logoName = logoName;
        this.url = url;

        this.sustainableDevelopmentGoalIds = sustainableDevelopmentGoalIds;
        this.competencyIds = competencyIds;
        this.partnerId = partnerId;
    }
}
