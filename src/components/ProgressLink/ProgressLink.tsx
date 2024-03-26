"use client";

import { cx } from "cva";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ComponentProps, MouseEvent, useTransition } from "react";

type Props = ComponentProps<typeof Link>;

export const ProgressLink = ({
  children,
  href,
  scroll,
  replace,
  onClick,
  className,
  ...rest
}: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    startTransition(() => {
      router[replace ? "replace" : "push"](href.toString(), {
        scroll,
      });
      onClick?.(event);
    });
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cx("relative", className)}
      {...rest}
    >
      {children}
      {pending && (
        <Loader2
          size={12}
          className="absolute -right-2 -top-2 animate-spin opacity-70"
        />
      )}
    </Link>
  );
};
