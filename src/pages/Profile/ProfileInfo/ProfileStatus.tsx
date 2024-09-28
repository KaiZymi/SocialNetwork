import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {updateUserStatus} from "../../../features/profile/profile_reducer";
import {Input} from "antd";


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

// class ProfileStatus extends React.Component<PropsType>{
//
//
//     state = {
//         editMode: false,
//         status: this.props.status
//     }
//
//     activateEditMode = () => {
//         this.setState ({
//             editMode: true
//         })
//     }
//
//     deactivateEditMode = () => {
//         this.setState ({
//             editMode: false
//         })
//         this.props.updateUserStatus(this.state.status)
//     }
//
//     onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
//         this.setState ({
//             status: e.currentTarget.value
//         })
//
//     }
//
//     componentDidUpdate(prevProps:PropsType, prevState:PropsType) {
//         if (prevProps.status !== this.props.status){
//             this.setState({
//                 status: this.props.status
//                 })
//         }
//
//     }
//
//     render (){
//
//         return (
//             <div>
//
//                 {!this.state.editMode &&
//                     <div >
//                         <span onDoubleClick={() => {this.activateEditMode()}}> {this.props.status || 'status'} </span>
//                     </div>
//                 }
//                 {this.state.editMode &&
//                     <div>
//                         <input onChange={this.onStatusChange}  autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}/>
//                     </div>
//                 }
//
//             </div>
//         )
//     }
//
//
//
//
// }




