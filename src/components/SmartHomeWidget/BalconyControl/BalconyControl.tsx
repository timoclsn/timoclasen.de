import { BalconyButton } from "./BalconyButton";
import { BalconyCount } from "./BalconyCount";
import { BalconyLight } from "./BalconyLight";

export const BalconyControl = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-sm space-y-2 rounded-3xl bg-dark bg-opacity-10 px-6 py-6 dark:bg-light dark:bg-opacity-10 xl:px-12 xl:py-12">
        <div className="flex gap-6">
          <BalconyLight />
          <div>
            <h2 className="text-md mb-2 font-bold md:text-xl lg:text-2xl">
              Balkonbeleuchtung
            </h2>
            <p className="text-md mb-4 opacity-60 md:text-lg lg:text-xl">
              Hinterlasse mir einen Gruß und schalte meine Balkonbeleuchtung in
              eine Farbe deiner Wahl:
            </p>
            <div className="mb-4 flex flex-col gap-4 sm:flex-row">
              <BalconyButton color="red">🔥 Rot</BalconyButton>
              <BalconyButton color="green">🌿 Grün</BalconyButton>
              <BalconyButton color="blue">🌊 Blau</BalconyButton>
            </div>
          </div>
        </div>
        <BalconyCount />
      </div>
    </div>
  );
};
