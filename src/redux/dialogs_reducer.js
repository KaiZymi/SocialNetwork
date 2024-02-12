const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY'
const SEND_MESSAGE = 'SEND_MESSAGE'

let  initialState = {
    dialogsData: [
        {id: 1, name: 'Mark'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Vector'}

    ],

    messageData:[
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Herooo exprensive'},
        {id: 3, message: 'MY GOD'}

    ],



}

const dialogsReducer = (state = initialState,action) => {
	switch (action.type){

		case SEND_MESSAGE:
			let body = action.newMessageBody
			return  {
				...state,
				messageData: [...state.messageData, {id: 4, message: body}]
			}

		default:
			return state
	}
}

export const sendMessageCreator = (newMessageBody) => ({ type: SEND_MESSAGE, newMessageBody })


export default dialogsReducer