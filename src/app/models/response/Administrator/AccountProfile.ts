export interface AccountProfile {
    id:               string;
    firstName:        string;
    lastName:         string;
    middleName:       string;
    userName:         string;
    email:            string;
    phoneNumber:      string;
    addresses?:        Address[];
    families?:         Family[];
    loanApplications?: LoanApplication[];
    loans?:            Loan[];
}
export interface Address {
    appUserId: string;
    barangay:  string;
    purok:     string;
    city:      string;
    id:        string;
    active:    boolean;
}

export interface Family {
    name:                 string;
    contactNumber:        string;
    relationshipType:     number;
    relationshipTypeName: string;
    dateOfBrith:          Date;
    isEmergencyContact:   boolean;
    address:              Address | null;
    id:                   string;
    active:               boolean;
}

export interface LoanApplication {
    appUser:         string;
    amountRequested: number;
    termsInDays:     number;
    purpose:         string;
    notes:           string;
    id:              string;
    active:          boolean;
}

export interface Loan {
    loanNumber:       string;
    appUserId:        string;
    appUser:          AccountProfile;
    disbursementDate: Date;
    principalAmount:  number;
    interestRate:     number;
    termsInDays:      number;
    loanStatus:       number;
    dueDate:          Date;
    id:               string;
    active:           boolean;
}
