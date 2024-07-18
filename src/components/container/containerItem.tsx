import React, {useEffect, useRef} from "react";
import './containerItem.scss';
import {setClassName} from "../../utils/className.ts";

export type ContainerItemProps = {
    col: 1| 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11| 12;
    row: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    children?: React.ReactNode;
    onResize?: (width: number, height: number) => void;
}

export default function ContainerItem(props: ContainerItemProps ){
    const wrapper = useRef(null);
    useEffect(() => {
        let resizeObserver: ResizeObserver;
        if (typeof window !== 'undefined') { // 클라이언트 사이드에서만 실행되도록 보장합니다.
            resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    const { width, height } = entry.contentRect;
                    props.onResize && props.onResize(width, height);
                }
            });

            if (wrapper.current) {
                resizeObserver.observe(wrapper.current);
            }
        }

        return () => {
            if (resizeObserver && wrapper.current) {
                resizeObserver.unobserve(wrapper.current);
            }
        };
    }, []);


    return (
        <div ref={wrapper} data-col={props.col} data-row={props.row} className={setClassName({'container-item': true})}>
            <div className={"container-content"}>
                {props.children}
            </div>
        </div>
    )
}