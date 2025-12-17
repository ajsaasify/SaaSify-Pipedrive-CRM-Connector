import type React from "react";
import style from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <main className={style.content}>{children}</main>;
};

export default Layout;
