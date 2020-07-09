/**
 * Represents a sustainable development goal
 */
export class Goal {
    index: number;
    title: string;
    shortDescription: string;

    constructor(index: number, title: string, shortDescription: string) {
        this.index = index;
        this.title = title;
        this.shortDescription = shortDescription;
    }
}
