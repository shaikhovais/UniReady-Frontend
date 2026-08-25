export interface Lookup {
    id: number;
    type: string;
    name: string;
    description: string | null;
    icon: string | null;
    displayOrder: number;
    color: string | null;
}