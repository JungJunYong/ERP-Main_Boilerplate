import React from 'react';
import './container.scss';
import {setClassName} from "../../utils/className.ts";
import {useMenuStatus} from "../../utils/useMenuStatus.tsx";

export default function Container(props: { children: React.ReactNode, open: boolean, style?: { display: string } }) {
    const {menuList, changeMenu , removeMenu} = useMenuStatus();

    return (
        <>
            <div className={setClassName({"header-menuList": true, open: props.open})}>
                <ul>
                    {menuList.map((menu) => {
                        return <li className={menu.visible ? 'active' : ''} key={menu.menu} onClick={() => {
                            changeMenu(menu.menu)
                        }}>
                            <div className={"menuName"}>
                                <span>{menu.menu}</span>
                            </div>
                            <button className={"menuBtn"} onClick={()=>{removeMenu(menu.menu)}}>X</button>
                        </li>
                    })}

                </ul>
            </div>

            <div className={"container-wrapper"}>
                <div className={setClassName({container: true, open: props.open})}>
                    {props.children}
                </div>
            </div>
        </>

    )
}