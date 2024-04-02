import React from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";

export function withRouter<WCP extends object>(Children: React.ComponentType<WCP>){
    return (props:WCP) => {

        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Children {...props} router={{ location, navigate, params }}/>
    }
}