export class HostGroup {
    groupid: string;
    name: string;
    flags: number;
    internal: number;

    constructor(groupid?: string, name?: string, flags?: number, internal?: number) {
        this.groupid = groupid;
        this.name = name;
        this.flags = flags;
        this.internal = internal;
    }
}
