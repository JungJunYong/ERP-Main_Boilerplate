import './sidebar.scss';
import {useState} from "react";
import {setClassName} from "../../utils/className.ts";


export type MenuList = {name: string, url: string, children?: MenuList}[];


export default function Sidebar(props: { open: boolean }) {
    const [menuList] = useState<MenuList>([{name: '메뉴2', url: '404'}, {name: '메뉴', url: '401'}]);
    const [selected, setSelected] = useState(menuList.findIndex((data) => data.url === location.hash.replace('#', '')));

    const menuClickHandler = (index: number) => {
        location.hash = menuList[index].url;
        setSelected(index);
    }

    return (
        <>
            <div className={setClassName({'sidebar': true, open: props.open})}>
                <div className={setClassName({'sidebar-title': true})}>
                    <div className={"icon"}>
                    </div>
                </div>
                <nav>
                    <ul className={"menuList"}>
                        {menuList.map((data, index) => {
                            return (
                                <li key={data.name}
                                    className={setClassName({"menuItem": true, selected: selected === index})}
                                    onClick={() => {
                                        menuClickHandler(index)
                                    }}>{data.name}</li>
                            )
                        })}
                    </ul>
                </nav>
            </div>

        </>
    )
}