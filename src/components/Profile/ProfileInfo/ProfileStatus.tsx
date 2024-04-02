import React, {ChangeEvent} from 'react';


type PropsType = {
    updateUserStatus: (status:string) => void,
    status: string,
}



class ProfileStatus extends React.Component<PropsType>{


    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState ({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState ({
            editMode: false
        })
        this.props.updateUserStatus(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState ({
            status: e.currentTarget.value
        })

    }

    componentDidUpdate(prevProps:PropsType, prevState:PropsType) {
        if (prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
                })
        }

    }

    render (){

        return (
            <div>

                {!this.state.editMode &&
                    <div >
                        <span onDoubleClick={() => {this.activateEditMode()}}> {this.props.status || 'status'} </span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange}  autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status}/>
                    </div>
                }

            </div>
        )
    }




}




export default ProfileStatus