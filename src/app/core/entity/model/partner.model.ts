/**
 * Represents a project partner
 */
export class Partner {
    /** ID */
    id: number;
    /** Partner name */
    name: string;
    /** Partner description */
    description: string;
    /** Partner phone number */
    phone: string;
    /** Partner mail address */
    mail: string;

    /**
     * Constructor
     * @param id partner ID
     * @param name partner name
     * @param description partner description
     * @param phone partner phone number
     * @param mail partner mail address
     */
    constructor(id: number, name: string, description: string, phone: string, mail: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.phone = phone;
        this.mail = mail;
    }
}
