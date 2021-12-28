import { Robot } from "./robot";

export class User {
    private name: string;
    private petRobot: Robot;
    private points: number;
    private checkpoint: number;

    constructor() {
        this.name = "name-not-set";
        this.petRobot = new Robot();
        this.points = 0;
        this.checkpoint = 0;
    }

    public setName(n: string) {
        this.name = n;
    }

    public getName(): string {
        return this.name;
    }

    public getRobot(): Robot {
        return this.petRobot;
    }

    public getPoints(): number {
        return this.points;
    }

    public addPoints(p: number) {
        this.points += p;
    }

    public deletePoints(p: number) {
        this.points -= p;
    }

    public getCheckpoint(): number {
        return this.checkpoint;
    }

    async advanceCheckpoint(): Promise<string> {
        // get book activity
        this.checkpoint += 1;
        return "checkpoint advanced";
    }

    async setCheckpoint(c: number): Promise<string> {
        this.checkpoint = c;
        return "checkpoint has been changed to " + c;
    }

}