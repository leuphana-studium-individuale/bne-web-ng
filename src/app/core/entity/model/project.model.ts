/**
 * Represents a project
 */
export class Project {
    /** Project ID */
    id: number;
    /** Project title */
    title: string;
    /** Project description */
    description: string;
    /** Cost per child */
    costsPerChild: number;
    /** Total costs */
    costsTotal: number;
    /** Effort in hours */
    effortInHours: number;
    /** Duration in days */
    durationInDays: number;
    /** Banner URL */
    bannerUrl: string;
    /** Project URL */
    url: string;

    /** IDs of associated sustainable development goals */
    sustainableDevelopmentGoalIds: number[];
    /** IDs of associated competencies */
    competencyIds: number[];
    /** ID of associated partner */
    partnerId: number;

    /**
     * Constructor
     * @param id project id
     * @param title project title
     * @param description project description
     * @param costPerChild cost per child
     * @param costTotal total cost
     * @param effortInHours effort in hours
     * @param durationInDays duration in days
     * @param bannerUrl banner URL
     * @param url project URL
     * @param sustainableDevelopmentGoalIds IDs of associated sustainable development goals
     * @param competencyIds IDs of associated competencies
     * @param partnerId ID of associated partner
     */
    constructor(id: number, title: string, description: string, costPerChild: number, costTotal: number, effortInHours: number,
                durationInDays: number, bannerUrl: string, url: string, sustainableDevelopmentGoalIds: number[], competencyIds: number[],
                partnerId: number) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.costsPerChild = costPerChild;
        this.costsTotal = costTotal;
        this.effortInHours = effortInHours;
        this.durationInDays = durationInDays;
        this.bannerUrl = bannerUrl;
        this.url = url;

        this.sustainableDevelopmentGoalIds = sustainableDevelopmentGoalIds;
        this.competencyIds = competencyIds;
        this.partnerId = partnerId;
    }
}
