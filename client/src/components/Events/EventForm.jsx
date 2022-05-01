import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import eventService from "../../services/event.service";
import { Update, EventAdd } from "../../actions/eventActions";
import { useDispatch } from "react-redux";
import Input from "../Form/Input";
import Validators from "../../helpers/formValidator";
import getImageUrl from "../../helpers/getImageUrl";
import ControlledDatePicker from "../ControlledDatePicker";
import ControlledMediaPicker from "../CotrolledImagePicker";

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
        <ControlledDatePicker
          withFullScreenPortal={false}
          label="StartDate"
          name="StartDate"
          validate={Validators([{ validation: "required" }])}
        />
        <ControlledDatePicker
          withFullScreenPortal={false}
          label="EndDate"
          name="EndDate"
          validate={Validators([{ validation: "required" }])}
        />
        <ControlledMediaPicker
          label="Event picture"
          name="picture"
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
