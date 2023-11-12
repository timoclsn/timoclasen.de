import { z } from "zod";
import { queryContent } from "../../lib/content";
import { markdownToHTML } from "../../lib/text";
import { Dashboard } from "./Dashboard";

export const SmartHomeWidget = async () => {
  const [textData, footnoteData] = await Promise.all([
    queryContent(
      `{
        textSnippetCollection(where: {title: "Smart Home Widget"}, limit: 1, preview: false) {
          items {
            content
          }
        }
      }`,
      z.object({
        data: z.object({
          textSnippetCollection: z.object({
            items: z.array(
              z.object({
                content: z.string(),
              }),
            ),
          }),
        }),
      }),
    ),
    queryContent(
      `{
        textSnippetCollection(where: {title: "Smart Home Widget Footnote"}, limit: 1, preview: false) {
          items {
            content
          }
        }
      }`,
      z.object({
        data: z.object({
          textSnippetCollection: z.object({
            items: z.array(
              z.object({
                content: z.string(),
              }),
            ),
          }),
        }),
      }),
    ),
  ]);

  const text = await markdownToHTML(
    textData.data.textSnippetCollection.items[0].content,
  );
  const footnote = await markdownToHTML(
    footnoteData.data.textSnippetCollection.items[0].content,
  );

  // const { darkMode } = useTheme();
  // const [disableButtons, setDisableButtons] = useState(false);

  // const utils = trpc.useContext();

  // const { data: smartHomeData, error: smartHomeError } =
  //   trpc.smarthome.smarthome.useQuery({
  //     cached: false,
  //   });

  // const mutateSmartHome = trpc.smarthome.turnOnBalcony.useMutation();

  // const { data: countData, error: countError } =
  //   trpc.smarthome.controlCount.useQuery();

  // const mutateCount = trpc.smarthome.updateControlCount.useMutation({
  //   onMutate: ({ color }) => {
  //     const oldData = utils.smarthome.controlCount.getData();
  //     if (!oldData) return { oldData };

  //     const newData = {
  //       ...oldData,
  //       [color]: oldData[color] + 1,
  //     };
  //     utils.smarthome.controlCount.setData(undefined, newData);

  //     return { oldData };
  //   },
  //   onError: (error, input, context) => {
  //     utils.smarthome.controlCount.setData(undefined, context?.oldData);
  //   },
  // });

  // const errorMessage = "Nicht erreichbar…";

  // async function controlLight(color: "red" | "green" | "blue", emoji: string) {
  //   setDisableButtons(true);

  //   const toastId = toast.loading("Schalten...");
  //   mutateSmartHome.mutate(
  //     { balconyColor: color },
  //     {
  //       onSuccess: () => {
  //         toast.remove(toastId);
  //         toast.success("Balkon wurde eingeschaltet!", {
  //           icon: emoji,
  //           duration: 5000,
  //         });
  //         utils.smarthome.smarthome.invalidate();
  //         mutateCount.mutate(
  //           { color },
  //           {
  //             onSuccess: () => {
  //               setDisableButtons(false);
  //             },
  //           },
  //         );
  //         track("Balcony Light Control", {
  //           color: `${emoji} ${color}`,
  //         });
  //       },
  //       onError: () => {
  //         toast.remove(toastId);
  //         toast.error("Hat nicht funktioniert.");
  //         setDisableButtons(false);
  //       },
  //     },
  //   );
  // }

  return (
    <section id="smarthome">
      <h2 className="mb-2 text-xl font-bold md:text-2xl lg:text-3xl">
        Smart Home
      </h2>
      <div className="mb-8" dangerouslySetInnerHTML={{ __html: text }}></div>
      <Dashboard footnote={footnote} />
    </section>
  );
};
