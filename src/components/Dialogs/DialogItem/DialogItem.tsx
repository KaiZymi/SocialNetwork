import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";
import {FC} from "react";

type PropsType = {
    id: number
    name: string
}

const DialogItem: FC<PropsType> = (props) => {
    return (
        <div className={s.dialog}>
            <NavLink to={"/Dialogs/" + props.id} >{props.name}</NavLink>
        </div>
    )
}



export default DialogItem