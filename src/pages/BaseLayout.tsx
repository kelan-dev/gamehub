import css from "./BaseLayout.module.css";
import NavBar from "../components/NavBar/NavBar";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import ImportGamesBanner from "../components/ImportGamesBanner";
import { useState } from "react";

export default function BaseLayout() {
  const [bannerClosed, setBannerClosed] = useState(false);

  return (
    <>
      <ScrollRestoration />
      <header>
        <nav>
          <NavBar />
        </nav>
      </header>
      <main className={css.main}>
        <aside className={css.aside}>
          <Sidebar />
        </aside>
        <div className={css.content}>
          {!bannerClosed && (
            <section className={css.importGamesBanner}>
              <ImportGamesBanner onClose={() => setBannerClosed(true)} />
            </section>
          )}
          <Outlet />
        </div>
      </main>
    </>
  );
}
