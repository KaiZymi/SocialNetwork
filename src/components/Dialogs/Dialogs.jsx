import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utils/validators/validations";
import {Textarea} from "../../common/FormsControls/FormsControls";




const Dialogs = (props) => {
    
    let dialogsElements = props.state.dialogsData.map(dialog => <DialogItem name={dialog.name} id={dialog.id} />)
    let messagesElements = props.state.messageData.map( message => <Message message={message.message}/>)

	let addNewMessage = (values) => {
		props.sendMessage(values.newMessageBody)
	}

    return (
        <div className={s.dialogs}>
            <div className={s.dialog_items}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                <div>{messagesElements}</div>
            </div>

			<DialogsReduxForm onSubmit={addNewMessage} />

        </div>
    )
}


const AddMessageForm = (props) =>{
	const maxLength = maxLengthCreator(100)

	return(
		<form onSubmit={props.handleSubmit} >
			<div>
				<Field component={Textarea} name={"newMessageBody"}
					   placeholder={"Enter ur message"} validate={[required, maxLength]}></Field>

			</div>
			<div>
				<button> Send </button>
			</div>
		</form>
	)
}

const DialogsReduxForm = reduxForm({
	form: 'dialogAddMessage'
})(AddMessageForm)



export default Dialogs