import {useEffect, useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {allEvents, RemoveEvent} from "../../actions/eventActions";

const useEventList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeEvent = useCallback(
    (id) => {
      dispatch(RemoveEvent(id))
        .then(() => {
          navigate("/events");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    [dispatch, navigate]
  );
  const [keyword, setKeyword] = useState("");

  const events = useSelector((state) => state.events.allEvents);

  useEffect(() => {
    dispatch(allEvents({page: 1}));
  }, []);

  const handlePageChange = useCallback(
    (page) => {
      dispatch(allEvents({page, keyword}));
    },
    [dispatch, keyword]
  );

  return {
    events,
    removeEvent,
    handlePageChange,
    setKeyword,
  };
};

export default useEventList;
