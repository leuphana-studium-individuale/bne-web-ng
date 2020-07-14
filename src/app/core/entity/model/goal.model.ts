/**
 * Represents a sustainable development goal
 */
export class Goal {
    /** Goal ID */
    id: number;
    /** Goal title */
    title: string;
    /** Goal description */
    description: string;

    /**
     * Constructor
     * @param id goal ID
     * @param title goal title
     * @param description goal description
     */
    constructor(id: number, title: string, description: string) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
}
