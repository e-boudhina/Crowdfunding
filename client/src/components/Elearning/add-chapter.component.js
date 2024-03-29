import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//draft js part
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
//actions
import { addPost } from "../../actions/postAction";
//ant part
import { Row, Col, Form, Input, Button, notification } from "antd";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { getCertificates } from "../../services/Learning.service";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Add(props) {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.post.notification);
  const post = "";
  const content = "";
  const editorContent = EditorState.createEmpty();
  const [editorState, setEditorState] = useState({
    editorState: editorContent,
  });
  const [name, setName] = useState(post.name);
  const [certificates, setCertificates] = useState([]);
  const [certifId,setCertifID] = useState(certificates[0] ? certificates[0]._id : 0);
const navigate = useNavigate();
  const handleEditorChange = (editorState) => {
    setEditorState({ editorState });
    console.log(editorState);
  };

  const onSubmit = () => {
    if ( certifId !== 0 ) { 
    const newPost = {
      //id,
      name,
      content: JSON.stringify(
        convertToRaw(editorState.editorState.getCurrentContent())
      ),
      certifId,
    };
    console.log(newPost);
    dispatch(addPost(newPost))
    navigate("/admin/listcertificates");
  } else {
 console.log("Please select a category");
  }
}

  useEffect(() =>  {
    retrieveCertificates()
    console.log("COMPO " + certificates);
    if (message.type) {
      notification[message.type]({
        duration: 1,
        message: <span>{message.message}</span>,
      });
    }
  }, []);

  const retrieveCertificates = () => {
    getCertificates()
      .then((response) => {
        setCertificates(response.data);
        setCertifID(response.data[0]._id);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const HandelChange = (e) => {
    console.log(e.target.value);
    setCertifID(e.target.value);
  }; 
  const uploadCallback =   (file) => {
    return new Promise((resolve, reject) => {
      const data = new FormData();
      data.append("image", file)
      axios.post("http://localhost:5000/api/learning/upload-image", data).then(responseImage => {
        console.log(responseImage);
           resolve({ data: { link: "" } });
      })
   });
}
function uploadImageCallBack(file) {
  return new Promise(
    (resolve, reject) => {
      const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
      xhr.open('POST', 'http://localhost:5000/api/learning/upload-image');
    //  xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
      const data = new FormData(); // eslint-disable-line no-undef
      data.append('image', file);
      xhr.send(data);
      xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
        console.log(response);
      });
      xhr.addEventListener('error', () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    },
  );
}


  return (
    <div >
      <Row justify="center">
        <Col span="12">
          <Form className="card-body"
            onFinish={onSubmit}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            initialValues={{ name }}>
            <Form.Item label="Name" name="name">
              {/* change local statof input */}
              <Input
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="content" name="content">
              <Editor
                editorState={editorState.editorState}
                onEditorStateChange={handleEditorChange}
                wrapperClassName="demo-wrapper"
                editorClassName="form-control form-control-lg mb-4"
                toolbar={{
                  image: {
                    uploadCallback: uploadImageCallBack,
                    alt: { present: true, mandatory: false },
                  },
                }}
              />
            </Form.Item>
            <div className="d-flex actions clearfix w-50">
              <select className="form-select" onChange={(option) => HandelChange(option)}>
                {Array.isArray(certificates) &&
                  certificates.map((item) => (
                    <option key={item.value} value={item._id}>
                      {item.name}
                    </option>
                  ))}
              </select>
              <Button
                type="primary"
                htmlType="submit"
                className="btn btn-success waves-effect waves-light ">
                Add post
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Add;
