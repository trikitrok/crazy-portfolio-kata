export class Asset {
    private readonly _description: string;
    private readonly _date: Date;
    private _value: Value;

    public constructor(description: string, date: Date, value: Value) {
        this._description = description;
        this._date = date;
        this._value = value;
    }

    public getDescription(): string {
        return this._description;
    }

    public getDate(): Date {
        return this._date;
    }

    public getValue(): Value {
        return this._value;
    }

    setValue(value: Value): void {
        this._value = value;
    }
}

export abstract class Value {
    protected readonly _value: number;

    protected constructor(value: number) {
        this._value = value;
    }

    public get(): number {
        return this._value;
    }

    public ToString(): string {
        return this._value.toString();
    }
}

export class MeasurableValue extends Value {
    constructor(value: number) {
        super(value);
    }
}

export class PricelessValue extends Value {

    constructor() {
        super(Number.POSITIVE_INFINITY);

    }
}

export class NoValue extends Value {
    constructor() {
        super(0);
    }
}

