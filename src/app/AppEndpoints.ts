import { environment } from "../environments/environment";

const apiUrl = environment.apiUrl;
export const AppEndpoints = {
    Auth : {
        Login : `${apiUrl}Auth/login`,
        Register: `${apiUrl}Auth/customer-enrollment`
    },
}