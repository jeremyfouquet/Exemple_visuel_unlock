export class Joueur {
    public id: number = 0;
    public pseudo: string = "";
    public img: string = "";
    public notes: Notes[] = [];
}

export class Notes {
    public message: string = "";
    public date: number = 0;
}

