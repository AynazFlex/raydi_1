import form from "./form.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registration, reset } from "../../store/apiReducer";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const { success, msg, error, isPending, url } = useSelector((state) => state.api);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    success && router.push(url);
    return () => dispatch(reset())
  }, [success]);

  const onSubmit = (data) => dispatch(registration(data));

  return (
    <div className={form.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={form.title}>Register</div>
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
        <div className={form.error}>{errors.password && "введите пароль"}</div>
        <input value="register" disabled={isPending || msg.length > 0} type="submit" />
        <div className={form.msg_error}>{error}</div>
        <div className={form.msg}>{msg}</div>
      </form>
    </div>
  );
}
