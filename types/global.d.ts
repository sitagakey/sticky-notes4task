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
    id: number;
    label: string;
    description: string;
    existDescription: boolean;
    registerDate: string;
    existRegisterDate: boolean;
    startDate: string;
    existStartDate: boolean;
    expirationDate: string;
    existExpirationDate: boolean;
    categoryId: number;
    existCategory: boolean;
    stateId: number;
    existController: boolean;
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
    relatedId: number;
}
export interface Toast {
    id: string;
    label: string;
}
