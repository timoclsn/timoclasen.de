import { Linkedin, Mail, Twitter } from "lucide-react";
import { query } from "../../api/query";
import { Button } from "../../design-system/Button";
import { TextWidget } from "../Widget/TextWidget";
import { WidgetLayout } from "../Widget/WidgetLayout";

export const ContactWidget = async () => {
  const text = await query.content.textSnippet("Contact Widget");

  return (
    <WidgetLayout>
      <TextWidget title="Kontakt" text={text} />
      <div className="flex h-full w-full flex-col items-center justify-between gap-4 px-6 py-12 pt-0 sm:gap-0 sm:pt-12 xl:px-12 xl:py-20">
        <Button as="a" href="mailto:timo@timoclasen.de" fullWidth>
          <Mail />
          E-Mail
        </Button>
        <Button
          as="a"
          variant="ghost"
          href="https://twitter.com/timoclsn"
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
        >
          <Twitter />
          Twitter
        </Button>
        <Button
          as="a"
          variant="ghost"
          href="https://www.linkedin.com/in/timoclsn/"
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
        >
          <Linkedin />
          LinkedIn
        </Button>
      </div>
    </WidgetLayout>
  );
};
