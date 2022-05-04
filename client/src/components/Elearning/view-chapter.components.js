import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LearningService from "../../services/Learning.service";
import './elearning.css'
import { EditorState, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { useDispatch, useSelector } from "react-redux";
import createImagePlugin from '@draft-js-plugins/image';
//import '../../../node_modules/@draft-js-plugins/image/lib/plugin.css'
import createImageRenderPlugin from 'draft-js-image-render-plugin';


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

  const [currentChapter, setCurrentChapter] = useState(
    initialChapterState
  );
  const [content, setContent] = useState(initialChapterState.content)
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty()

  );
  const [chapname, setChapname] = useState("")
  const imagePlugin = createImagePlugin();
  const imageRenderPlugin = createImageRenderPlugin();

  useEffect(() => {

    let chap = {
      _id: null,
      name: "",
      content: {},
      createdAt: "",
      updatedAt: "",
    };
    let cnt = {};
    let idchap = progress.currentChapter._id ? progress.currentChapter._id : id
    LearningService.getChapter(idchap)
      .then((response) => {
        chap = response.data;
        cnt = JSON.parse(chap.content);
        setChapname(chap.name)
        setEditorState((EditorState.createWithContent(convertFromRaw(cnt))));
        console.log("content " + chap.content);

      })
      .catch((e) => {
        console.log(e);
      })


  }, [id, props.chapter, progress.currentChapter._id]);

  return (
    <div>
      <div className="author-text text-center"> <h2> {JSON.stringify(chapname)}</h2> </div>
      <Editor
        editorState={editorState}
        readOnly={true}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        toolbarClassName="rich-text__toolbar"


      />

    </div>
  );
};
export default ViewChapter;
