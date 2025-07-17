import { environment } from "../environments/environment";

const apiUrl = environment.apiUrl;
export const AppEndpoints = {
    Auth : {
        Login : `${apiUrl}Auth/login`,
        Register: `${apiUrl}Auth/customer-enrollment`
    },
    Access : {
        GetAllAccess : `${apiUrl}Access`,
        AddModule : `${apiUrl}Access`
    },
    Account : 
    {
        GetAccounts : `${apiUrl}Account/accounts`,
        CheckProfileByAdmin : `${apiUrl}Account/profile`
    },
    Permission : {
        GetUserAccess : `${apiUrl}Permission/access`
    }
}