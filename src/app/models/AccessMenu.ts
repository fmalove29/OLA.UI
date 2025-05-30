// access-menu.model.ts
export interface AccessMenu {
    id: number;
    name: string;
    link?: string;
    icon?: string;
    disabled?: boolean;
    children?: AccessMenu[]; // 👈 child menu support
}
