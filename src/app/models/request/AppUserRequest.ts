export interface Address {
    id: string;
    active: boolean;
    barangay: string;
    city: string;
    purok: string;
}

export interface Family {
    id: string;
    active: boolean;
    name: string;
    contactNumber: string;
    relationType: number;
    dateOfBrith: string; // ISO string format
    isEmergencyContact: boolean;
    addressId: string;
    address: Address;
}
export interface AppUserRequest {
    id: string;
    active: boolean;
    firstName: string;
    lastName: string;
    middleName: string;
    userName: string;
    email: string;
    password: string;
    phoneNumber: string;
    addresses: Address[];
    families: Family[];
}