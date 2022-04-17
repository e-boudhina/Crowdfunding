import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LearningService from "../../services/Learning.service";
import draftToHtml from "draftjs-to-html";
import { Editor, EditorState, convertFromRaw } from "draft-js";
// import c from "./content.json"
const ViewChapter = (props) => {
  const { id } = useParams();

  const initialChapterState = {
    _id: null,
    name: "",
    content: {
      "blocks": [
          {
              "key": "7isfv",
              "text": "This is it",
              "type": "unstyled",
              "depth": 0,
              "inlineStyleRanges": [],
              "entityRanges": [],
              "data": {}
          }
      ],
      "entityMap": {}
  },
    createdAt: "",
    updatedAt: "",
  };

  const [currentChapter, setCurrentChapter] = useState(
    initialChapterState
  );
  const [content , setContent ] =useState(initialChapterState.content)
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty()
  
  );

  const getChapter = (id) => {
    LearningService.getChapter(id)
      .then((response) => {
        setCurrentChapter(response.data);
     //   console.log(c);
        setContent(JSON.parse(currentChapter.content));
     //   console.log(JSON.parse(currentChapter.content));
     setEditorState (( EditorState.createWithContent(convertFromRaw(content))));
      })
      .catch((e) => {
        console.log(e);
      });
  }; 

  useEffect(() => {
    let chap = {
      _id: null,
      name: "",
      content: {},
      createdAt: "",
      updatedAt: "",
    };
    let cnt = {} ;
    LearningService.getChapter(id)
    .then((response) => {
    //  setCurrentChapter(response.data);
      //setContent(JSON.parse(currentChapter.content));
      chap = response.data;
      cnt = JSON.parse(chap.content);
      setEditorState (( EditorState.createWithContent(convertFromRaw(cnt))));
    })
    .catch((e) => {
      console.log(e);
    });


  }, [id]); 

  return (
    <div>
   <Editor editorState={editorState} readOnly={true} />
    </div>
  );
};
export default ViewChapter;
