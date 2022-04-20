/* eslint-disable import/no-anonymous-default-export */
import {GET_PROGRESS,UPDATE_PROGRESS , RESET_PROGRESS, NOT_ENGAGED, ENGAGED} from "../../actions/type";

const initialState={
    isEngaged : false , 
    progress:[
        {
            "_id": "",
            "user": "",
            "certificate": {
                "img": {
                    "data": "",
                    "contentType": ""
                },
                "_id": "",
                "name": "",
                "category": "",
                "chapters": [
                    
                
                ],
                "createdAt": "",
                "updatedAt": "",
                "__v": 0
            },
            "currentChapter": "",
            "isCompleted": false,
            "__v": 0
        }
    ]

}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case  ENGAGED:
            return {
                ...state,
                isEngaged: true,
            };
            case  NOT_ENGAGED:
                return {
                    ...state,
                    isEngaged: false,
                };
        case  GET_PROGRESS:
            console.log("get progress");
            return {
                ...state,
                progress: payload,
            };
        case UPDATE_PROGRESS:
            return {
                progress: payload
            };
            case RESET_PROGRESS:
                console.log("Reset progress");
                return {
                    initialState,
                }
        default:
            return state;
    }
}
