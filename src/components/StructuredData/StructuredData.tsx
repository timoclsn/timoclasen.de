import { Thing, WithContext } from "schema-dts";

type ThingWithoutString = Exclude<Thing, string>;

interface Props<TThing extends ThingWithoutString> {
  type: TThing["@type"];
  children: WithContext<TThing>;
}

export const StructuredData = <T extends ThingWithoutString>({
  children,
}: Props<T>) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(children),
      }}
    />
  );
};
