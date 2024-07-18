import './header.scss';
import {setClassName} from "../../utils/className.ts";


export type HeaderProps = {
    open: boolean
    onClick?: () => void;
}

export default function Header(props: HeaderProps) {


    return (
        <>
            <div className={setClassName({header: true, open: props.open})}>
                <div className={"header-wrapper"}>
                    <div className={"button-wrapper"}>
                        <div className={"button"} onClick={props.onClick}>
                        </div>
                    </div>
                    <div className={"button-wrapper"} style={{marginLeft: 'auto', marginRight: '10px'}}>
                    </div>
                </div>
            </div>
        </>
    )
}

