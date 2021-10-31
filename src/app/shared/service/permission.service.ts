import {Injectable, OnInit} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PermissionService implements OnInit {

    private userGroup: any;
    private hostGroups: any[];

    constructor() {
    }

    ngOnInit(): void {
    }

    public getUserGroup(): any {
        return this.userGroup;
    }

    public setUserGroup(userGroup: any): void {
        this.userGroup = userGroup;
    }

    public getHostGroups(): any[] {
        return this.hostGroups;
    }

    public setHostGroups(hostGroups: any[]): void {
        this.hostGroups = hostGroups;
    }

    public getTemplatesPermission(templates: any[]): boolean {
        console.log(templates);
        const templateIdsToCheck = templates.map(template => template.templateid);
        console.log(templateIdsToCheck);
        const hostGroupIds: string[] = [];
        if (this.hostGroups && this.hostGroups.length > 0) {
            this.hostGroups.forEach(hostGroup => {
                if (hostGroup.templates && hostGroup.templates.length > 0) {
                    hostGroup.templates.forEach(template => {
                        if (templateIdsToCheck.includes(template.templateid)) {
                            hostGroupIds.push(hostGroup.groupid);
                        }
                    });
                }
            });
        }
        console.log(hostGroupIds);
        return true;
    }
}
