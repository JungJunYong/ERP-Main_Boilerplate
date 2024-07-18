import {useMenuStatus} from "./utils/useMenuStatus.tsx";
import {Suspense, useState} from "react";
import Header from "./components/header/header.tsx";
import Sidebar from "./components/sidebar/sidebar.tsx";
import Container from "./components/container/container.tsx";
import './app.scss';



export default function App() {
    const {menuList} = useMenuStatus();
    const [open, setOpen] = useState(true)
    return (
        <>
            <Header open={open} onClick={() => {
                setOpen(!open)
            }}/>
            <Sidebar open={open}/>

            {/*메뉴 영역*/}
            <Container open={open}>
                <Suspense fallback={<div>Loading...</div>}>
                    {menuList.map((menu) => {
                        return <div key={menu.menu} style={{display: menu.visible ? '' : 'none'}}>
                            <menu.component key={menu.menu} visible={menu.visible}/>
                        </div>
                    })}
                </Suspense>
            </Container>
        </>
    )
}