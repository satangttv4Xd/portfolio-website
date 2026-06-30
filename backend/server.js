import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "data", "portfolio.json");
const DEFAULT_DATA_FILE = path.join(__dirname, "data", "portfolio.default.json");
const UPLOADS_DIR = path.join(__dirname, "uploads");

// ---------- เตรียมไฟล์ / โฟลเดอร์ที่จำเป็นตอนเริ่มเซิร์ฟเวอร์ ----------
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
if (!fs.existsSync(DATA_FILE)) fs.copyFileSync(DEFAULT_DATA_FILE, DATA_FILE);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use("/uploads", express.static(UPLOADS_DIR));

// ---------- ตั้งค่าอัปโหลดรูปภาพด้วย multer ----------
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"].includes(ext) ? ext : ".jpg";
    cb(null, `img-${Date.now()}-${Math.round(Math.random() * 1e6)}${safeExt}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // จำกัดไฟล์ละไม่เกิน 8MB
  fileFilter: (_req, file, cb) => {
    const ok = /image\/(jpeg|png|webp|gif|svg\+xml)/.test(file.mimetype);
    cb(ok ? null : new Error("รองรับเฉพาะไฟล์รูปภาพ (jpg, png, webp, gif, svg)"), ok);
  },
});

// ---------- Helper: อ่าน/เขียนไฟล์ข้อมูล ----------
function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
}
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// ---------- Routes ----------

// ดึงข้อมูลพอร์ตโฟลิโอทั้งหมด
app.get("/api/portfolio", (_req, res) => {
  try {
    res.json(readData());
  } catch (err) {
    res.status(500).json({ error: "อ่านข้อมูลไม่สำเร็จ", detail: err.message });
  }
});

// บันทึก/แก้ไขข้อมูลพอร์ตโฟลิโอ (ส่ง object ทั้งก้อนมาทับของเดิม)
app.put("/api/portfolio", (req, res) => {
  try {
    const incoming = req.body;
    if (!incoming || typeof incoming !== "object") {
      return res.status(400).json({ error: "รูปแบบข้อมูลไม่ถูกต้อง" });
    }
    writeData(incoming);
    res.json({ ok: true, data: incoming });
  } catch (err) {
    res.status(500).json({ error: "บันทึกข้อมูลไม่สำเร็จ", detail: err.message });
  }
});

// คืนค่าข้อมูลกลับเป็นค่าเริ่มต้น
app.post("/api/portfolio/reset", (_req, res) => {
  try {
    fs.copyFileSync(DEFAULT_DATA_FILE, DATA_FILE);
    res.json({ ok: true, data: readData() });
  } catch (err) {
    res.status(500).json({ error: "รีเซ็ตข้อมูลไม่สำเร็จ", detail: err.message });
  }
});

// อัปโหลดรูปภาพ -> คืน url กลับไปให้ frontend เก็บลงในข้อมูล
app.post("/api/upload", (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: "ไม่พบไฟล์รูปภาพ" });
    res.json({ url: `/uploads/${req.file.filename}` });
  });
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use((req, res) => {
  res.status(404).json({ error: `ไม่พบ endpoint: ${req.method} ${req.path}` });
});

app.listen(PORT, () => {
  console.log(`✅ Portfolio backend กำลังทำงานที่ http://localhost:${PORT}`);
});
