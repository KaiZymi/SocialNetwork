
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../redux/dialogs_reducer";
import React from "react";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {WithAuthRedirect} from "../../hoc/AuthRedirect";

import {compose} from "redux";


let mapStateToProps = (state) => {
    return {
        state: state.dialogsPage,
		isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage : (newMessageBody) => {
            dispatch(sendMessageCreator(newMessageBody))
        }
    }
}



// let AuthRedirectComponent = WithAuthRedirect(Dialogs)
// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)


export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	WithAuthRedirect
)(Dialogs);