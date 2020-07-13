/**
 * Represents a sustainable development goal
 */
export class Goal {
    id: number;
    title: string;
    shortDescription: string;

    constructor(id: number, title: string, shortDescription: string) {
        this.id = id;
        this.title = title;
        this.shortDescription = shortDescription;
    }
}
