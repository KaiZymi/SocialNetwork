import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {updateUserStatus} from "../../../redux/profile_reducer";


type PropsType = {
    updateUserStatus: (status:string) => void,
    status: string,
}

export const ProfileStatus: FC<PropsType> = (props) =>{
    const [status, setStatus] = useState(props.status)
    const [editMode, setEditMode] = useState(false)

    const dispatch:any = useDispatch()


    const activateEditMode = () =>{
        setEditMode(true)
    }

    const deactivateEditMode = () =>{
        setEditMode(false)
        dispatch(updateUserStatus(status))
    }

    const onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    useEffect(() => {

    }, [status]);

    return <>
        {!editMode &&
            <div >
                <span onDoubleClick={() => {activateEditMode()}}> {props.status || 'status'} </span>
            </div>
        }
        {editMode &&
            <div>
                <input onChange={onStatusChange}  autoFocus={true} onBlur={deactivateEditMode} value={status}/>
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




