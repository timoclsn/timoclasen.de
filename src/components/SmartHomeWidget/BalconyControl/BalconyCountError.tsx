"use client";

import { DEFAULT_QUERY_ERROR_MESSAGE } from "../../../lib/data/errors";

interface Props {
  message?: string;
}

export const BalconyCountError = ({ message }: Props) => {
  return <span>{message ?? DEFAULT_QUERY_ERROR_MESSAGE}</span>;
};
