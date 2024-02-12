import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import {Route, Routes, useParams} from "react-router-dom";
import React, {lazy, Suspense} from "react";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app_reducer";
import Preloader from "./common/preloader/Preloader";
import './assets/styles/global.css'
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";


const UsersContainer = lazy(() => import('./components/Users/UsersContainer'));
// const ProfileContainer = lazy(() => import('./components/Profile/ProfileContainer'));







export function withRouter(Children) {
	return (props) => {

		const match = {params: useParams()};
		return <Children {...props} match={match}/>
	}
}


class App extends React.Component {
	componentDidMount() {
		this.props.initializeApp()
	}

	render() {
		if(!this.props.initialized){
			return <Preloader />
		}

		return (

			<div className="app-wrapper">

				<HeaderContainer/>

				<div className={"block-content"}>

					<Navbar/>

					<div className="app-wrapper-content">
						<Suspense  fallback={<div> loading... </div>}>
							<Routes>
								<Route path='/dialogs/*' element={<DialogsContainer/>}/>
								
								<Route path='/users/*' element={
									<UsersContainer/>
								}/>

								<Route path='/profile/:userId?' element={<ProfileContainer/>}/>
								<Route path='/login/' element={<Login/>}/>

							</Routes>
						</Suspense>
					</div>
				</div>
			</div>

		);
	}
}

const mapStateToProps = (state) =>({
	initialized: state.app.initialized
})


export default compose(
	withRouter,
	connect (mapStateToProps, {initializeApp})
)(App)
