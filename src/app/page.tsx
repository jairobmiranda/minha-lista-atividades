"use client";

import { Helloworld } from "@/lib/helpers/helpers";

const texto = Helloworld();

export default function Home() {
  return <div>{texto}</div>;
}
