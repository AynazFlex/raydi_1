import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { checkoutOrders } from "../../store/apiReducer";
import { useRouter } from "next/router";

export default function About() {
  const dispatch = useDispatch()
  const {success, order: {id}, url, msg, isPending, error} = useSelector(state => state.api)
  const router = useRouter();

  useEffect(() => {
    success && router.push(url);
  }, [success]);

  return (
		<div>
      <button
        onClick={() => dispatch(checkoutOrders({
          order_id: id,
          method: 3,
          email: 'jkz1713x2@gmail.com'
        }))}
        disabled={isPending}
      >checkout orders</button>
      <div>{error}</div>
      <div>{msg}</div>
    </div>
  )
}
