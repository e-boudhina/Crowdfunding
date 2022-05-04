import {
  ENGAGED,
  GET_PROGRESS,
  NOT_ENGAGED,
  RESET_PROGRESS,
  UPDATE_PROGRESS,
  SET_CHAPTERS,
  INIT_CHAPTERS,
  SET_CURRENT_CHAPTER,
  SET_NEXT_CHAPTER,
  SET_PREVIOUS_CHAPTER,
  CLEAR_CHAPTERS,
  SET_CERTIF,
  SET_CERTIFS
} from "../type";
import LearningService from "../../services/Learning.service";
import { getCertificates } from "../../services/Learning.service";
export const setCertif = ( certif ) => ( dispatch ) => {
  console.log("Called action set certif "+ certif);
  dispatch({
    type: SET_CERTIF,
    payload: certif,
  });
}
export const resetProgress = (  ) => ( dispatch ) => {
  dispatch({
    type: RESET_PROGRESS,
  });
  dispatch({
    type: NOT_ENGAGED,
    payload: false,
  });
}
export const setCurrentChapter = ( chapter ) => ( dispatch ) => {
  console.log("Called action set current chapter with "+JSON.stringify(chapter));
  dispatch({
    type: SET_CURRENT_CHAPTER,
    payload: chapter,
  });
}
export const setChaptersAction = (chapters, chapter) => (dispatch) => {
  const chap = chapters.filter((obj) => JSON.stringify(obj).includes(chapter))[0]
console.log("FEL ACTION CHAP = "+JSON.stringify(chap));
  dispatch({
    type: SET_CHAPTERS,
    payload: chapters,
  });
  dispatch({
    type: SET_CURRENT_CHAPTER,
    payload: chap,
  });
  if (chapters[chapters.indexOf(chapter) - 1]  ) {
    //ken fama previous
    console.log("ACTION / SETTING PREV");
    dispatch({
      type: SET_PREVIOUS_CHAPTER,
      payload: chapters[chapters.indexOf(chapter) - 1],
    });
  }

  if (chapters[chapters.indexOf(chapter) + 1]) {
    dispatch({
      type: SET_NEXT_CHAPTER,
      payload: chapters[chapters.indexOf(chapter) + 1],
    });
  }
};

export const getProgress = (user, certif) => (dispatch) => {
  let obj = {};
  obj["user"] = user;
  obj["certificate"] = certif;
  return LearningService.getProgress(obj).then(
    (data) => {
      if (data.status === 200) {
   //     console.log("200" + JSON.stringify(data.data[0]));
        dispatch({
          type: GET_PROGRESS,
          payload: data.data[0],
        });
        dispatch({
          type: ENGAGED,
          payload: true,
        });
        return Promise.resolve();
      } else if (data.status === 404) {
        console.log("404");
        dispatch({
          type: RESET_PROGRESS,
        });
        return Promise.resolve();
      }
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("404");
      dispatch({
        type: RESET_PROGRESS,
      });
      /*        dispatch({
                type: FETCHING_USERS_FAILED,
            });
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });*/
      return Promise.reject();
    }
  );
};

export const setCertifs = (  ) => ( dispatch ) => {
  return LearningService.getCertificates().then(
    (data) => {
      if (data.status === 200) {
   //     console.log("200" + JSON.stringify(data.data[0]));
        dispatch({
          type: SET_CERTIFS,
          payload: data.data,
        });
        return Promise.resolve();
      } else if (data.status === 404) {
        console.log("404");
        return Promise.resolve();
      }
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: RESET_PROGRESS,
      });
      return Promise.reject();
    }
  );
}