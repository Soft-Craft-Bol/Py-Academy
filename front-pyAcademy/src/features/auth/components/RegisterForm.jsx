import { useForm } from "react-hook-form";
import { NameGroup } from "./NameGroup";
import { AuthGroup } from "./AuthGroup";
import { RoleSelect } from "./RoleSelect";
import { useRegister } from "../hooks/useRegister";

export const RegisterForm = () => {
  const { register, handleSubmit } = useForm();
  const { submit } = useRegister();

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6">
      <NameGroup register={register} />
      <AuthGroup register={register} />
      <input type="text" {...register("username")} className="hidden" defaultValue="Softcraft" />
      <input type="text" {...register("photo")} className="hidden" defaultValue="https://..." />
      <RoleSelect register={register} />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-xl">
        Registrarse
      </button>
    </form>
  );
};
