import { PagedMeta } from "../common/PagedMeta";

export interface Account{
    id? : string,
    firstName? : string,
    lastName? : string,
    middleName? : string,
    userName? : string,
    email : string,
    phoneNumber? : string,
    addresses : Address[]
    families : Family[]
}
export interface Address{
    id? : string,
    barangay : string,
    purok : string,
    city : string
}
export interface Family{
    id? : string,
    name : string,
    contactNumber : string,
    relationshipType : string,
    dateOfBirth : string,
    isEmergencyContact : boolean,
    Address : Address
}

export interface AccountResponse {
    data: Account[];
    meta : PagedMeta;
}

export interface AccountParams{
    firstName : string,
    lastName : string,
    userName : string,
    search : string,
    email : string,
    total : number,
    limit : number,
    page : number,
    lastPage : number
}