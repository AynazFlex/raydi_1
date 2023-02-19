import form from "./form.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../store/apiReducer";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from 'next/link'

export default function Login() {
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

  const onSubmit = (data) => dispatch(login(data));

  return (
    <div className={form.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={form.title}>Login</div>
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
        <input value="login" disabled={isPending || msg.length > 0} type="submit" />
        <div className={form.msg_error}>{error}</div>
        <div className={form.msg}>{msg}</div>
        <Link className={form.recovery} href='/recovery'>Забыли пароль?</Link>
      </form>
    </div>
  );
}