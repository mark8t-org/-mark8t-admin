export namespace loginRequest {
    export const scopes: string[];
    import extraQueryParameters = extraQueryParameters;
    export { extraQueryParameters };
}
export namespace tokenRequest {
    import scopes_1 = apiConfig.scopes;
    export { scopes_1 as scopes };
    export const forceRefresh: boolean;
}
export namespace msalConfig {
    export { redirectUrl as redirect_uri };
    export namespace auth {
        export const azureAD: string;
        export { authClientID as clientId };
        export const response_type: string;
        export const responseType: string;
        export const responseMode: string;
        export const code_challenge_method: string;
        export const authorityDomain: string;
        export const authority: string;
        export const validateAuthority: boolean;
        export const knownAuthorities: string[];
        export const redirectUri: string;
        export const postLogoutRedirectUri: string;
        export { scopes };
        export const navigateToLoginRequestUrl: boolean;
        export namespace extraQueryParameters_1 {
            const domain_hint: string;
        }
        export { extraQueryParameters_1 as extraQueryParameters };
        export namespace claims {
            namespace userinfo {
                namespace given_name {
                    const essential: boolean;
                }
                const nickname: null;
                namespace email {
                    const essential_1: boolean;
                    export { essential_1 as essential };
                }
                namespace email_verified {
                    const essential_2: boolean;
                    export { essential_2 as essential };
                }
                const picture: null;
                namespace role {
                    const essential_3: boolean;
                    export { essential_3 as essential };
                }
            }
            namespace id_token {
                const gender: null;
                namespace birthdate {
                    const essential_4: boolean;
                    export { essential_4 as essential };
                }
            }
        }
    }
    export namespace cache {
        const cacheLocation: string;
        const storeAuthStateInCookie: boolean;
    }
    export namespace system {
        const windowHashTimeout: number;
        const iframeHashTimeout: number;
        const loadFrameTimeout: number;
        namespace loggerOptions {
            function loggerCallback(level: any, message: any, containsPii: any): void;
        }
    }
}
export namespace apiConfig {
    export const endpoint: string;
    const scopes_2: string[];
    export { scopes_2 as scopes };
}
export const tenantName: "tracercanada";
export const redirectUrl: any;
export const scopes: string[];
declare const authClientID: any;
export {};
