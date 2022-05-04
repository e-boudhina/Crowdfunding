import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate  } from "react-router-dom";
import CheckButton from "react-validation/build/button";
import {
  getCategorieslearning,
  AddCertificate,
} from "../../services/Learning.service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


function AddChapter() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [catCertif, setCatCertif] = useState("");
  const [tutor, setTutor] = useState("");
  const [description, setDescription] = useState("");
  const form = useRef();
  const checkBtn = useRef();
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [image, setImage] = useState(null);

  useEffect(() => {
    getCategorieslearning().then((data) => {
      setCategories(data.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", catCertif);
    formData.append("image", image);
    formData.append("tutor", tutor);
    formData.append("description", description);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      console.log("NAME " + name + "CERTIF " + catCertif);
      AddCertificate(formData).then((data) => {
        if (data.status === 200) {
          dispatch({
            type: "ADD_MESSAGE",
            payload: {
              message: "Certificate added successfully",
              status: "success",
            },
          });
          navigate("/admin/listcertificates");
        }
      });
    }
  };
  const HandelChangeCat = (e) => {
    console.log(e.target.value);
    setCatCertif(e.target.value);
  };
  const HandleDescriptionChange = (e) => {
    setDescription(e.target.value);
    console.log(description);
  };
  const HandleTutorChange = (e) => {
    setTutor(e.target.value);
    console.log(tutor);
  };

  const HandleChangeName = (e) => {
    setName(e.target.value);
    console.log(name);
  };

  return (
    <div className="card-body">
      <Form enctype="multipart/form-data" onSubmit={handleSubmit} ref={form}>
        <h4 className="card-title">Add a new certificate </h4>
        <div className="row mb-3">
       
          <label
            htmlFor="example-text-input"
            className="col-sm-2 col-form-label">
            Name{" "}
          </label>
          <div className="col-sm-10">
            <Input className="form-control" onChange={HandleChangeName} />
          </div>
        </div>
        <div className=" row mb-3">

        <label
            htmlFor="example-text-input"
            className="col-sm-2 col-form-label">
            Tutor{" "}
          </label>
          <div className="col-sm-10">
            <Input className="form-control" onChange={HandleTutorChange} />
          </div>
        </div>
        <div className=" row mb-3">
       
        <label
            htmlFor="example-text-input"
            className="col-sm-2 col-form-label">
            description{" "}
          </label>
          <div className="col-sm-10">
            <Input className="form-control" onChange={HandleDescriptionChange} />
          </div>
        </div>
        <div className=" row mb-3">

          <label className="col-sm-2 col-form-label">Category </label>
          <div className="col-sm-10">
            <select
              className="form-select"
              onChange={(option) => HandelChangeCat(option)}>
              {Array.isArray(categories) &&
                categories.map((item) => (
                  <option key={item.value} value={item._id}>
                    {item.name}
                  </option>
                ))}
            </select>
            <label className="btn btn-secondary mb-4 mt-3" htmlFor="image"> Choose image </label>
                      <Input
                        type="file"
                        id="image"
                        name="image"
                        validations={[required]}
                        onChange={(e) => {
                          setImage(e.target.files[0])
                          console.log(e.target.files[0]);
                      }}
                      />
         
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
            <button
              type="primary"
              htmlType="submit"
              className="btn btn-success waves-effect waves-light ">
              Add Certif
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default AddChapter;
