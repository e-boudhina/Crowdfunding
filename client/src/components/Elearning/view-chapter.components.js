import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LearningService from "../../services/Learning.service";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw, convertFromRaw, Editor } from "draft-js";

const ViewChapter = (props) => {

  const { id } = useParams();

  const initialChapterState = {
    _id: null,
    name: "",
    content: {},
    createdAt: "",
    updatedAt: "",
  };
  

  const [currentChapter, setCurrentChapter] = useState(initialChapterState.content);

  const getChapter = (id) => {
    LearningService.getChapter(id)
      .then((response) => {
        setCurrentChapter(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {

    if (id) {
      getChapter(id);
      console.log("CHAPTER " + currentChapter.content);
    }
  }, [id, currentChapter.content]);

  return (
<div>
     <Editor
 editorState={EditorState.createWithContent(convertFromRaw(JSON.parse(currentChapter.content)))}
 readOnly/>
    </div>
  );
};
export default ViewChapter;
