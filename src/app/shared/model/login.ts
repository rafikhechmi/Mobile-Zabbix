export class Login {
    id: string;
    method: string;
    jsonrpc: string;
    params: any;
    auth: string;

    constructor(id?: string, method?: string, jsonrpc?: string, params?: any, auth?: string) {
        this.id = id;
        this.method = method;
        this.jsonrpc = jsonrpc;
        this.params = params;
        this.auth = auth;
    }
}

export class UserCredentials {
    user: string;
    password: string;
    userData: boolean;
}
