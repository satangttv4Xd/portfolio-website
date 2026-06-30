import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * แปลง element ที่ส่งเข้ามาให้กลายเป็นไฟล์ PDF หลายหน้าแบบ A4 แล้วสั่งดาวน์โหลด
 * @param {HTMLElement} element - DOM node ที่ต้องการแคปเจอร์ (ทั้งหน้าพอร์ตโฟลิโอ)
 * @param {string} fileName - ชื่อไฟล์ที่จะดาวน์โหลด เช่น "portfolio.pdf"
 */
export async function exportElementToPdf(element, fileName = "portfolio.pdf") {
  if (!element) throw new Error("ไม่พบส่วนของหน้าเว็บที่จะแปลงเป็น PDF");

  const canvas = await html2canvas(element, {
    backgroundColor: "#0E0D0C",
    scale: Math.min(window.devicePixelRatio || 1, 2),
    useCORS: true,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  });

  const imgData = canvas.toDataURL("image/jpeg", 0.95);

  // ขนาดกระดาษ A4 ที่ 96dpi โดยประมาณ (มม.)
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // คำนวณอัตราส่วนภาพให้พอดีความกว้างหน้ากระดาษ แล้วตัดแบ่งเป็นหลายหน้าตามความสูง
  const imgWidthMm = pageWidth;
  const imgHeightMm = (canvas.height * imgWidthMm) / canvas.width;

  let heightLeftMm = imgHeightMm;
  let positionMm = 0;
  let page = 0;

  while (heightLeftMm > 0) {
    if (page > 0) pdf.addPage();
    // ขยับภาพขึ้นไปทีละหน้า โดยให้ jsPDF crop ส่วนที่เกินหน้ากระดาษทิ้งอัตโนมัติ
    pdf.addImage(imgData, "JPEG", 0, positionMm, imgWidthMm, imgHeightMm, undefined, "FAST");
    heightLeftMm -= pageHeight;
    positionMm -= pageHeight;
    page += 1;
    if (page > 40) break; // กันลูปยาวเกินไปกรณีเนื้อหายาวผิดปกติ
  }

  pdf.save(fileName);
}
