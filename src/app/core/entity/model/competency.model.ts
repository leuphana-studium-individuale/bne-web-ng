/**
 * Represents a competency
 */
export class Competency {
    /** Competency ID */
    id: number;
    /** Competency title */
    title: string;
    /** Competency description */
    description: string;

    /**
     * Constructor
     * @param id competency ID
     * @param title competency title
     * @param description competency description
     */
    constructor(id: number, title: string, description: string) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
}
