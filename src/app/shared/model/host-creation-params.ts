import {HostInterface} from './host-interface';
import {HostGroup} from './host-group';
import {HostTemplate} from './host-template';
import {Host} from './host';

export class HostCreationParams extends Host {
    interfaces: HostInterface[];
    groups: HostGroup[];
    templates: HostTemplate[];
    macros: any[];
    inventory: any;
}
