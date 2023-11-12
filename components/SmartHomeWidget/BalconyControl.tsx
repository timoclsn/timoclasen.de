import { Button } from "../Button";
import { Skeleton } from "../Skeleton";

export const BalconyControl = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-screen-sm space-y-2 rounded-3xl bg-dark bg-opacity-10 px-6 py-6 dark:bg-light dark:bg-opacity-10 xl:px-12 xl:py-12">
        <div className="flex space-x-6">
          {smartHomeData ? (
            <div
              className="flex flex-none items-center justify-center font-bold"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "9999px",
                boxShadow:
                  smartHomeData.balconyOnOff === "Aus"
                    ? "none"
                    : `0 0 50px ${smartHomeData?.balconyColor}`,
                backgroundColor:
                  smartHomeData.balconyOnOff === "Aus"
                    ? darkMode
                      ? "#000000"
                      : "#FFFFFF"
                    : smartHomeData?.balconyColor,
              }}
            >
              <span>
                {smartHomeData &&
                  smartHomeData.balconyOnOff === "Aus" &&
                  smartHomeData.balconyOnOff}
              </span>
            </div>
          ) : (
            <Skeleton
              circle
              width="100px"
              height="100px"
              className="flex-none"
            />
          )}
          <div>
            <h2 className="text-md mb-2 font-bold md:text-xl lg:text-2xl">
              Balkonbeleuchtung
            </h2>
            <p className="text-md mb-4 opacity-60 md:text-lg lg:text-xl">
              Hinterlasse mir einen Gruß und schalte meine Balkonbeleuchtung in
              eine Farbe deiner Wahl:
            </p>
            <div className="mb-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button
                variant="ghost"
                size="small"
                onClick={() => controlLight("red", "🔥")}
                disabled={disableButtons}
                fullWidth
              >
                🔥 Rot
              </Button>
              <Button
                variant="ghost"
                size="small"
                onClick={() => controlLight("green", "🌿")}
                disabled={disableButtons}
                fullWidth
              >
                🌿 Grün
              </Button>
              <Button
                variant="ghost"
                size="small"
                onClick={() => controlLight("blue", "🌊")}
                disabled={disableButtons}
                fullWidth
              >
                🌊 Blau
              </Button>
            </div>
          </div>
        </div>
        {!countError && (
          <div className="flex justify-center">
            <p className="whitespace-nowrap text-sm opacity-60">
              {countData ? (
                `Zähler: Rot ${countData.red} | Grün ${countData.green} | Blau ${countData.blue}`
              ) : (
                <Skeleton width="250px" />
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
