const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export function assetUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API_URL}${path}`;
}

export async function fetchPortfolio() {
  const res = await fetch(`${API_URL}/api/portfolio`);
  if (!res.ok) throw new Error("โหลดข้อมูลพอร์ตโฟลิโอไม่สำเร็จ");
  return res.json();
}

export async function savePortfolio(data) {
  const res = await fetch(`${API_URL}/api/portfolio`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("บันทึกข้อมูลไม่สำเร็จ");
  return res.json();
}

export async function resetPortfolio() {
  const res = await fetch(`${API_URL}/api/portfolio/reset`, { method: "POST" });
  if (!res.ok) throw new Error("รีเซ็ตข้อมูลไม่สำเร็จ");
  return res.json();
}

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);
  const res = await fetch(`${API_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "อัปโหลดรูปภาพไม่สำเร็จ");
  }
  return res.json(); // { url }
}

export { API_URL };
