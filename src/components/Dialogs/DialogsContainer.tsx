import {actions} from "../../redux/dialogs_reducer";

import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

import {compose} from "redux";
import {AppStateType} from "../../redux/store";
import {ComponentType} from "react";


let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}







export default compose<ComponentType>(
	connect(mapStateToProps, {sendMessage : actions.sendMessage} ),
    withAuthRedirect
)(Dialogs)