import {useContext} from 'react';


import React, {createContext, useEffect, useState} from "react";
import * as Notfount from "../pages/404.tsx";


export type MenuStatus = {
    menu: string;
    visible: boolean;
    component: React.LazyExoticComponent<React.ComponentType<any>>;
}

type MenuContextType = {
    menuList: MenuStatus[];
    changeMenu: (menu: string) => void;
    removeMenu: (menuId: string) => void;
    viewMenu: (menuId: string) => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [menuList, setMenuList] = useState<MenuStatus[]>([]);

    useEffect(() => {
        const hashChangeHandler = (e: HashChangeEvent) => {
            e.preventDefault();
            viewMenu(location.hash.replace('#', ''));
        };

        // 이벤트 등록
        window.addEventListener('hashchange', hashChangeHandler);

        //초기 메뉴 오픈
        viewMenu(location.hash.replace('#', ''));

        // 돔제거시 이벤트 삭제
        return () => {
            window.removeEventListener('hashchange', hashChangeHandler);
        }
    }, []);

    const viewMenu = (menuId: string) => {
        if (menuId === '') {
            return;
        }
        setMenuList(prevMenuList => {
            prevMenuList.forEach((menu) => {
                menu.visible = menu.menu === menuId;
            })
            if (prevMenuList.findIndex((menu) => menu.menu === menuId) !== -1) {
                return [...prevMenuList];
            }
            return [
                ...prevMenuList,
                {menu: menuId, visible: true, component: getMenuComponent(menuId)}
            ]
        });
    }

    const removeMenu = (menuId: string) => {
        let index = menuList.findIndex((menu) => menu.menu === menuId);

        menuList.splice(index, 1);
        let hash = '';
        if (menuList.length > 0) {
            index = index - 1 < 0 ? 0 : index - 1;
            menuList[index].visible = true;
            hash = menuList[index].menu;
        }
        setTimeout(() => {
            location.hash = hash
        }, 0)

        setMenuList([...menuList])
    }


    const goMenu = (menu: string) => {
        location.hash = menu;
    }


    const getPage = async (menu: string) => {
        try {
            return await import(`../pages/${menu}`)
        } catch (e) {
            return Notfount
        }
    }

    const getMenuComponent = (menu: string) => {
        return React.lazy(() => getPage(menu))
    }


    return (
        <>
            <MenuContext.Provider value={{menuList, changeMenu: goMenu, removeMenu, viewMenu}}>
                {children}
            </MenuContext.Provider>
        </>
    )
}


export function useMenuStatus() {
    const context = useContext(MenuContext);
    if (!context) {
        throw new Error('useMenuStatus must be used within a MenuProvider');
    }
    return context;
}