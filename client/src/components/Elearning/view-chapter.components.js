import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LearningService from "../../services/Learning.service";
import draftToHtml from "draftjs-to-html";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { useDispatch, useSelector } from "react-redux";
//import c from "./content.json"
const ViewChapter = (props) => {
  const progress = useSelector((state) => state.progress);
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

  const [editorState, setEditorState] = useState(
    EditorState.createEmpty()
  );
    const  [chapname,setChapname] = useState("")
const [chapid , setChapid] = useState(progress.currentChapter._id)


  useEffect(() => {
    let chap = {
      _id: null,
      name: "",
      content: {},
      createdAt: "",
      updatedAt: "",
    };
    let cnt = {} ;
   let idchap = progress.currentChapter._id  ?progress.currentChapter._id : id
   //setChapid(progress.currentChapter._id  ? progress.currentChapter._id : id)
   //setChapid(props.chapter  ? props.chapter : id)
    LearningService.getChapter(idchap)
    .then((response) => {
      chap = response.data;
      cnt = JSON.parse(chap.content);
      setChapname(chap.name)
      setEditorState (( EditorState.createWithContent(convertFromRaw(cnt))));
    })
    .catch((e) => {
      console.log(e);
    });


  }, [id,props.chapter,progress.currentChapter._id]); 

  return (
    <div>
     <div className="author-text text-center"> <h2> { JSON.stringify(chapname)}</h2> </div>
   <Editor editorState={editorState} readOnly={true} />
    </div>
  );
};
export default ViewChapter;
