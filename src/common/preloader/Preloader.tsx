import preloader from "../../app/assets/images/1488.gif";
import React, {FC} from "react";


let Preloader: FC = (props) => {
    return <div>
        <img src={preloader} alt="preloader"/>
    </div>
}

export default Preloader