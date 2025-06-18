import Input from "../../../shared/ui/atoms/Input";

export const NameGroup = ({ register }) => (
  <div className="grid grid-cols-2 gap-4">
    <Input label="Nombre" {...register("nombre")} />
    <Input label="Apellido" {...register("apellido")} />
  </div>
);
