import React from "react";
import Header, {MapDispatchType, MapPropsType} from "./Header";

import {logout} from "../../redux/auth_reducer";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/store";




class HeaderContainer extends React.Component<MapPropsType & MapDispatchType>{

    render(){
        return <Header {...this.props} />

    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})


export default connect<MapPropsType,MapDispatchType,{},AppStateType>(mapStateToProps, {logout})(HeaderContainer)