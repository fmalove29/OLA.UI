export interface DialogFormFields {
    name: string;
    label: string;
    type: 'text' | 'checkbox' | 'textarea' | 'select' | 'number' | 'email' | 'password'| 'autocomplete'|'chips-autocomplete';
    required?: boolean;
    options?: { value: any; label: string }[]; // for select fields
    placeholder?: string;
    defaultValue?: any;
    className?: string;
    disabled?: boolean;
  }
  
  export interface DialogFormData {
    title: string;
    confirmText?: string;
    cancelText?: string;
    fields?: DialogFormFields[];
    initialValues?: any;
  }
  