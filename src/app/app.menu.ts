import { IMenuItem } from './core/model/imenu-item';


export let initiMenuItems: Array<IMenuItem> =
    [

        {
            text: 'NAVBAR.DASHBOARD',
            icon: './../assets/svg/home_icon.svg',
            route: '/home',
            submenu: null
        },
        {
            text: 'NAVBAR.REPORTING',
            icon: './../assets/svg/reporting_icon.svg',
            route: '/reporting',
            submenu: null
        },
        {
            text: 'NAVBAR.USER_MANAGEMENT',
            icon: './../assets/svg/gestion-utilisateurs_icon.svg',
            route: '/userManagment',
            submenu: [
                {
                    text: 'NAVBAR.ROLE_MANAGEMENT',
                    icon: null,
                    route: '/role',
                    submenu: null
                },
                {
                    text: 'NAVBAR.FIELD_MANAGEMENT',
                    icon: null,
                    route: '/fields',
                    submenu: null
                },
                {
                    text: 'NAVBAR.USER',
                    icon: null,
                    route: '/user',
                    submenu: null
                }
            ]
        },
        {
            text: 'NAVBAR.SETTING',
            icon: './../assets/svg/parametres_icon.svg',
            route: '/setting',
            submenu: [
                {
                    text: 'NAVBAR.PASSWORD_SETTING',
                    icon: null,
                    route: '/language',
                    submenu: null
                }
            ]
        }
    ];

