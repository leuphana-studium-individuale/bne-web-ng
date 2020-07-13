export class Partner {
    id: number;
    name: string;
    description: string;
    phone: string;
    mail: string;

    constructor(id: number, name: string, description: string, phone: string, mail: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.phone = phone;
        this.mail = mail;
    }
}
