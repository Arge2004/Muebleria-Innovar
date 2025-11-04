"use client";

import { Admin, ListGuesser } from "@/components/admin";
import CategoryList from "@/components/category/CategoryList";
import { Resource, type CoreAdminProps } from "ra-core";

const AdminApp = (props: CoreAdminProps) => (
  <Admin {...props}>
    <Resource name="categories" list={<CategoryList />} />
  </Admin>
);

export default AdminApp;