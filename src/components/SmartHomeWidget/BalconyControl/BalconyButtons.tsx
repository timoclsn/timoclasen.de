import { BalconyButtonForm } from "./BalconyButtonForm";

export const BalconyButtons = () => {
  return (
    <div className="mb-4 flex flex-col gap-4 sm:flex-row">
      <BalconyButtonForm color="red">🔥 Rot</BalconyButtonForm>
      <BalconyButtonForm color="green">🌿 Grün</BalconyButtonForm>
      <BalconyButtonForm color="blue">🌊 Blau</BalconyButtonForm>
    </div>
  );
};
