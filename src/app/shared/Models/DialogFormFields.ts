export interface DialogFormFields {
    name: string;
    label: string;
    type: 'text' | 'checkbox' | 'textarea' | 'select';
    required?: boolean;
    options?: string[]; // for select
}