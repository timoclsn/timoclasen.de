"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "../../design-system/Button";

type Props = Omit<
  ButtonProps,
  "type" | "disabled" | "as" | "href" | "target" | "rel"
>;

export const SubmitButton = ({ children, ...rest }: Props) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} {...rest}>
      {children}
    </Button>
  );
};
