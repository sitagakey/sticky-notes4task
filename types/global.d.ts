export type SortOrder =
    | 'registerAsc'
    | 'registerDesc'
    | 'startDateAsc'
    | 'startDateDesc'
    | 'expirationAsc'
    | 'expirationDesc';
export interface StatePanelItem {
    id: number;
    label: string;
    isActive: boolean;
    sortOrder: SortOrder;
}
export type StatePanel = StatePanelItem[];
export interface Task {
    label: string;
    description: string;
    existDescription: boolean;
    registerDate: Date;
    existRegisterDate: boolean;
    startDate: Date;
    existStartDate: boolean;
    expirationDate: Date;
    existExpirationDate: boolean;
    category: string;
    categoryId: number;
    existCategory: boolean;
    stateId: number;
}
export interface Category {
    id: number;
    label: string;
    isActive: boolean;
}
export interface CheckboxData {
    id: string | number;
    label: string;
    checked: boolean;
}
export interface MenuBtn {
    alt: string;
}
