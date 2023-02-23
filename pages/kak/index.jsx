import { useSelector, useDispatch } from "react-redux";
import { createOrders } from "../../store/apiReducer";


export default function Kak() {
  const dispatch = useDispatch()
  const {msg, isPending, error} = useSelector(state => state.api)

  return (
    <div>
      <button
        disabled={isPending}
        onClick={() =>
          dispatch(
            createOrders({
              service_id: 22,
              url: 1234,
              quantity: 500,
            })
          )
        }
      >
        create order
      </button>
      <div>{error}</div>
      <div>{msg}</div>
    </div>
  );
}
