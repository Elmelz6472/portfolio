import {  ContextMenueItem } from "../../types/ContextMenu";

const menuItems: ContextMenueItem[]= [
    { name: 'New Folder', action: () => console.log('New Folder') },
    { name: 'Get Info', action: () => console.log('Get Info') },
    { name: 'Change Wallpaper', action: () => console.log('Change Wallpaper') },
    { name: 'Sort', action: () => console.log('Sort') },
];


export default menuItems