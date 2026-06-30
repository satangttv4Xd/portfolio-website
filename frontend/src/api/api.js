import defaultData from "../data/portfolioDefault.json";

const STORAGE_KEY = "portfolio_data";

export function assetUrl(path) {
  if (!path) return "";
  return path;
}

export async function fetchPortfolio() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : defaultData;
}

export async function savePortfolio(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return { ok: true, data };
}

export async function resetPortfolio() {
  localStorage.removeItem(STORAGE_KEY);
  return { ok: true, data: defaultData };
}

export async function uploadImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve({ url: e.target.result });
    reader.onerror = () => reject(new Error("อ่านไฟล์ไม่สำเร็จ"));
    reader.readAsDataURL(file);
  });
}
