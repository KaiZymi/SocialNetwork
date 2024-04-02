import s from './Post.module.css'
import {FC} from "react";

type OwnPropsType = {
    message:string
    likesCount: number
}

const Post: FC<OwnPropsType> = (props) => {
    return (
            
        <div className={s.posts}>
            <div className={s.item}>
                <img src="https://e7.pngegg.com/pngimages/791/512/png-clipart-user-profile-computer-icons-internet-bot-others-miscellaneous-monochrome.png" alt="avatar" />
                {props.message}
                <div>
                    <span>Like</span>
                </div>
            </div>

        </div>
    )
}

export default Post