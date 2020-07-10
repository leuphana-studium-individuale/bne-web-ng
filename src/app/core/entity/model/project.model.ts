export class Project {
    id: number;
    title: string;
    description: string;
    costPerChild: number;
    costTotal: number;
    effortInHours: number;
    durationInDays: number;
    logoName: string;
    url: string;

    sustainableDevelopmentGoalIds: number[];
    competencyIds: number[];
    partnerId: number;

    constructor(id: number, title: string, description: string, costPerChild: number, costTotal: number, effortInHours: number,
                durationInDays: number, logoName: string, url: string, sustainableDevelopmentGoalIds: number[], competencyIds: number[],
                partnerId: number) {
        this.id = id;
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
