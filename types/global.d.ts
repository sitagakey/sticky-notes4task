export type SortType =
    | 'registerAsc'
    | 'registerDesc'
    | 'startDateAsc'
    | 'startDateDesc'
    | 'expirationAsc'
    | 'expirationDesc';
export interface StatePanel {
    id: number;
    label: string;
    isActive: boolean;
    sortType: SortType;
}
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
    click: () => void;
}
export interface PulldownOption {
    label: string;
    value: string;
}
export interface ConfigBox {
    isOpen: boolean;
    label: string;
    categoryConfig: boolean;
    taskAddConfig: boolean;
    taskEditConfig: boolean;
}
