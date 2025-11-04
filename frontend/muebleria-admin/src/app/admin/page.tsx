"use client";

import dynamic from "next/dynamic";
import jsonServerProvider from "ra-data-json-server";

const dataProvider = jsonServerProvider(
  "http://localhost:8080/api"
);

const Admin = dynamic(() => import("./AdminApp"), {
  ssr: false, // Required to avoid react-router related errors
});


export default function Page() {
  return <Admin dataProvider={dataProvider} />;
}