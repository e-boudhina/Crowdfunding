/* eslint-disable import/no-anonymous-default-export */
import {
  GET_PROGRESS,
  UPDATE_PROGRESS,
  RESET_PROGRESS,
  NOT_ENGAGED,
  ENGAGED,
  SET_CHAPTERS,
  SET_CURRENT_CHAPTER,
  SET_NEXT_CHAPTER,
  SET_MESSAGE,
  SET_PREVIOUS_CHAPTER,
  CLEAR_CHAPTERS,
  SET_CERTIF,
  SET_CERTIFS
} from "../../actions/type";
const emptyChapter = {
  _id: null,
  name: "",
  content: {
    blocks: [
      {
        key: "7isfv",
        text: "This is it",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {},
      },
    ],
    entityMap: {},
  },
  createdAt: "",
  updatedAt: "",
};
const initialState = {
  isEngaged: false,
  progress: 
    {
      _id: "",
      user: "",
      certificate: {
        img: {
          data: "",
          contentType: "",
        },
        _id: "",
        name: "",
        category: "",
        chapters: [],
        createdAt: "",
        updatedAt: "",
        __v: 0,
      },
      currentChapter: "",
      isCompleted: false,
      __v: 0,
    }
  ,
  chapters: [],
  currentChapter: emptyChapter,
  nextChapter: emptyChapter,
  previousChapter: emptyChapter,
  certif:{},
  certificates :[]
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_CERTIF:
      return {
        ...state,
        certif: payload,
      };
    case SET_CHAPTERS:
      return {
        ...state,
        chapters: payload,
      };
      case SET_CERTIFS:
        return {
          ...state,
          certificates: payload,
        };

    case SET_CURRENT_CHAPTER:
      return {
        ...state,
        currentChapter: payload,
      };
    case SET_NEXT_CHAPTER:
      return {
        ...state,
        nextChapter: payload,
      };
    case SET_PREVIOUS_CHAPTER:
      return {
        ...state,
        previousChapter: payload,
      };
      case CLEAR_CHAPTERS:
        return {
         ...state,
          previousChapter: emptyChapter,
          nextChapter: emptyChapter,
          currentChapter: emptyChapter,
        };
        
    case ENGAGED:
      return {
        ...state,
        isEngaged: true,
      };
    case NOT_ENGAGED:
      return {
        ...state,
        isEngaged: false,
      };
    case GET_PROGRESS:
      console.log("get progress");
      return {
        ...state,
        progress: payload,
      };
    case UPDATE_PROGRESS:
      return {
        progress: payload,
      };
    case RESET_PROGRESS:
      console.log("Reset progress");
      return {
        ...state,
        progress : initialState.progress,
        chapters : initialState.chapters,
      };
    default:
      return state;
  }
}
