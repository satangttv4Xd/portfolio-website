import { useEffect, useRef, useState } from "react";
import { useThemeColor } from "./hooks/useThemeColor.js";
import { useColorMode } from "./hooks/useColorMode.js";
import { Loader2 } from "lucide-react";
import { fetchPortfolio, savePortfolio, resetPortfolio } from "./api/api.js";
import { exportElementToPdf } from "./utils/exportPdf.js";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/sections/Hero.jsx";
import About from "./components/sections/About.jsx";
import Projects from "./components/sections/Projects.jsx";
import Skills from "./components/sections/Skills.jsx";
import Experience from "./components/sections/Experience.jsx";
import Contact from "./components/sections/Contact.jsx";
import Footer from "./components/Footer.jsx";
import EditModePanel from "./components/EditModePanel.jsx";
export default function App() {
  const [data, setData] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const printRef = useRef(null);
  const { color: themeColor, changeColor } = useThemeColor();
  const { mode: colorMode, changeMode } = useColorMode();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const portfolio = await fetchPortfolio();
    setData(portfolio);
  }

  async function handleSave(newData) {
    const result = await savePortfolio(newData);
    setData(result.data);
  }

  async function handleResetDefault() {
    const result = await resetPortfolio();
    setData(result.data);
    return result.data;
  }

  async function handleExportPdf() {
    if (!printRef.current) return;
    setExporting(true);
    try {
      const fileName = `${(data?.profile?.name || "portfolio").trim().replace(/\s+/g, "-")}.pdf`;
      await exportElementToPdf(printRef.current, fileName);
    } catch (err) {
      alert(`สร้าง PDF ไม่สำเร็จ: ${err.message}`);
    } finally {
      setExporting(false);
    }
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-archive-bg">
        <Loader2 className="animate-spin text-amber" size={28} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-archive-bg">

      <Navbar
        name={data.profile.name}
        editMode={editOpen}
        onToggleEdit={() => setEditOpen((v) => !v)}
        onExportPDF={handleExportPdf}
        exporting={exporting}
      />

      <main ref={printRef}>
        <Hero profile={data.profile} exporting={exporting} themeColor={themeColor} colorMode={colorMode} />
        <About about={data.about} />
        <Projects projects={data.projects} />
        <Skills skills={data.skills} />
        <Experience experience={data.experience} />
        <Contact contact={data.contact} profile={data.profile} />
      </main>

      <Footer name={data.profile.name} />

      <EditModePanel
        open={editOpen}
        onClose={() => setEditOpen(false)}
        data={data}
        onSave={handleSave}
        onResetDefault={handleResetDefault}
        themeColor={themeColor}
        onChangeThemeColor={changeColor}
        colorMode={colorMode}
        onChangeColorMode={changeMode}
      />
    </div>
  );
}
