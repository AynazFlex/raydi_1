import form from "./form.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registration } from "../../store/authReducer";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const { msg, error, isPending } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSubmit = (data) => dispatch(registration(data))

  return (
    <div className={form.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <label>
          Password
          <input
            type="password"
            placeholder="password"
            {...register("password", { required: true })}
          />
        </label>
        <div className={form.error}>
          {errors.password && "введите пароль"}
        </div>
        <input disabled={isPending || msg.length > 0} type="submit" />
        <div className={form.msg_error}>{error}</div>
        <div className={form.msg}>{msg}</div>
      </form>
    </div>
  );
}
