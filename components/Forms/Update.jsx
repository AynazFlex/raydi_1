import form from "./form.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { reset, updatePassword } from "../../store/apiReducer";

export default function Update() {
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
  const { msg, error, isPending } = useSelector((state) => state.api);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(reset());
  }, []);

  const onSubmit = (data) => {
    dispatch(updatePassword(data));
  };

  return (
    <div className={form.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={form.title}>Update</div>
        <label>
          Old password
          <input
            type="password"
            placeholder="password"
            {...register("password", {
              required: true,
            })}
          />
        </label>
        <div className={form.error}>
          {errors.password && "введите старый пароль"}
        </div>
        <label>
          New password
          <input
            type="password"
            placeholder="password"
            {...register("new_password", {
              required: true,
            })}
          />
        </label>
        <div className={form.error}>
          {errors.new_password && "введите новый пароль"}
        </div>
        <label>
          Repeat password
          <input
            type="password"
            placeholder="password"
            {...register("new_password1", {
              required: "повторите пароль",
              onChange: (e) => {
                if (e.target.value !== getValues("new_password")) {
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
          {errors.new_password1?.message || errors.noequal?.message}
        </div>
        <input value="сохранить" disabled={isPending} type="submit" />
        <div className={form.msg_error}>{error}</div>
        <div className={form.msg}>{msg}</div>
      </form>
    </div>
  );
}