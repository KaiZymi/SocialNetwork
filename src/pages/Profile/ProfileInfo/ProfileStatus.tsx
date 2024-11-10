import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {Input} from "antd";
import {updateUserStatus} from "../../../features/profile/profile_actions";


type PropsType = {
    updateUserStatus: (status:string) => void,
    status: string,
}

export const ProfileStatus: FC<PropsType> = (props) =>{
    const [status, setStatus] = useState(props.status)
    const [editMode, setEditMode] = useState(false)

    const dispatch:any = useDispatch()

    useEffect(() => {
        setStatus(props.status);
    }, [status]);


    const onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }



    const activateEditMode = () =>{
        setEditMode(true)
    }

    const deactivateEditMode = () =>{
        setEditMode(false)
        dispatch(updateUserStatus(status))
    }

    return <>
        {!editMode &&
            <div >
                <b onDoubleClick={() => {activateEditMode()}}> {props.status || 'status'} </b>
            </div>
        }
        {editMode &&
            <div>
                <Input style={{width:'250px'}} onChange={onStatusChange}  autoFocus={true} onBlur={deactivateEditMode} value={status}/>
            </div>
        }
    </>


}






