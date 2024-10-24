export type AcceptedValues = 0 | 0.5 | 1;

export type DevRow = ReadonlyArray<AcceptedValues>;

export type AvailabilityData = ReadonlyArray<DevRow>;

export type DevTag = {
    developers: string[];
    addDeveloper: (tag: string) => void;
    removeDeveloper: (tag: string) => void;
}
