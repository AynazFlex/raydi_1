import form from "./form.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { reset } from "../../store/authReducer";
import { recovery } from "../../store/authReducer";

export default function Recovery() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const { msg, error, isPending } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(reset())
  }, []);

  const onSubmit = (data) => dispatch(recovery(data));

  return (
    <div className={form.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={form.title}>Recovery</div>
        <label>
          Email
          <input
            placeholder="email"
            {...register("email", {
              required: "введите email",
              pattern:
                /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
            })}
          />
        </label>
        <div className={form.error}>
          {errors.email && (errors.email.message || "введите корректный email")}
        </div>
        <input value="recovery" disabled={isPending} type="submit" />
        <div className={form.msg_error}>{error}</div>
        <div className={form.msg}>{msg}</div>
      </form>
    </div>
  );
}