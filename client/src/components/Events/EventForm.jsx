import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import eventService from "../../services/event.service";
import { Update, EventAdd } from "../../actions/eventActions";
import { useDispatch } from "react-redux";
import Input from "../Form/Input";
import Validators from "../../helpers/formValidator";
import getImageUrl from "../../helpers/getImageUrl";

const EventForm = ({ id }) => {
  const isAddMode = !id;

  // functions to build form returned by useForm() hook
  const formMethods = useForm();

  const dispatch = useDispatch();
  function onSubmit(data) {
    return isAddMode ? dispatch(EventAdd(data)) : dispatch(Update(id, data));
  }

  useEffect(() => {
    if (!isAddMode) {
      // get user and set form fields
      eventService.getevent(id).then((event) => {
        formMethods.reset({ ...event.data });
      });
    }
  }, [id, isAddMode, formMethods.reset, formMethods]);

  return (
    <FormProvider {...formMethods}>
      <form
        className="card card-body mt-2"
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <img
          height={100}
          width={100}
          alt="img"
          src={getImageUrl(formMethods.watch("picture"))}
        ></img>
        <Input
          label={"EventName"}
          name={"EventName"}
          validate={Validators([{ validation: "required" }])}
        />
        <Input
          label="EventDescription"
          name={"EventDescription"}
          type="textarea"
          validate={Validators([{ validation: "required" }])}
        />
        <Input
          label={"StartDate"}
          name={"StartDate"}
          type="date"
          validate={Validators([{ validation: "required" }])}
        />
        <Input
          label={"endDate"}
          name={"endDate"}
          type="date"
          validate={Validators([{ validation: "required" }])}
        />
        <button className="btn btn-primary mb-1" type="submit">
          submit
        </button>
      </form>
    </FormProvider>
  );
};

export default EventForm;
