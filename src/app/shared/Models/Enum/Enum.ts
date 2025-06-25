export enum Module
{
    Security = 'Security',
    Access = 'Access',
    PersonalCollection = 'Personal Collection',
    Loan = 'Loan',
    Inventory = 'Inventory',
    SalesOrder = 'Sales Order'
}

export enum Role
{
    Admin = 'Admin',
    Collector = 'Collector',
    User = 'User',
}
export function enumToOptions(e: any): { label: string; value: number }[] {
    return Object.keys(e)
      .filter(key => isNaN(Number(key))) // filter out reverse mapping
        .map(key => ({
        label: key,
        value: e[key]
      }));
  }