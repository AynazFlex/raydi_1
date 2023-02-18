import form from "./form.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { reset, resetPassword } from "../../store/authReducer";

export default function Reset() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });
  const { sign, msg, error, isPending } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(reset());
  }, []);

  const onSubmit = ({ password, password1 }) => {
    console.log(password, password1, sign);
    dispatch(resetPassword({ password, password1, sign }));
  };

  return (
    <div className={form.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={form.title}>Reset</div>
        <label>
          New password
          <input
            type="password"
            placeholder="password"
            {...register("password", {
              required: true,
            })}
          />
        </label>
        <div className={form.error}>
          {errors.password && "введите новый пароль"}
        </div>
        <label>
          Repeat password
          <input
            type="password"
            placeholder="password"
            {...register("password1", {
              required: "повторите пароль",
              onChange: (e) => {
                if (e.target.value !== getValues("password")) {
                  setError("noequal", {
                    message: "не совподает",
                  });
                } else {
                  clearErrors(["noequal"]);
                }
              },
            })}
          />
        </label>
        <div className={form.error}>
          {errors.password1?.message || errors.noequal?.message}
        </div>
        <input value="сохранить" disabled={isPending} type="submit" />
        <div className={form.msg_error}>{error}</div>
        <div className={form.msg}>{msg}</div>
      </form>
    </div>
  );
}
