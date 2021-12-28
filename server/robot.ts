export class Robot {
    private name: string;
    private eyes: string;
    private body: string;
    private arms: string;
    private legs: string;

    constructor() {
        this.name = "";
        this.eyes = "";
        this.body = "";
        this.arms = "";
        this.legs = "";
    }

    public setName(n: string) {
        this.name = n;
    }

    public getName(): string {
        return this.name;
    }

    async setAppearance(e: string, b: string, a: string, l: string): Promise<string> {
        // get book activity
        this.eyes = e;
        this.body = b;
        this.arms = a;
        this.legs = l;
        return "robot appearance set";
    }

    public getEyes(): string {
        return this.eyes;
    }

    public getBody(): string {
        return this.body;
    }

    public getArms(): string {
        return this.arms;
    }

    public getLegs(): string {
        return this.legs;
    }

}