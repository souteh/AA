export interface IMenuItem {
    text: string;
    icon: string;
    route: string;
    submenu: Array<IMenuItem>;
}
