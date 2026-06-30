import { useRef, useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { uploadImage, assetUrl } from "../../api/api.js";

/**
 * ปุ่มอัปโหลดรูป: คลิกหรือลากไฟล์มาวาง แล้วอัปโหลดไปที่ backend
 * เมื่ออัปโหลดสำเร็จจะเรียก onChange(url) เพื่อให้ฟอร์มที่ใช้งานนำ url ไปเก็บ
 */
export default function ImageUploader({ value, onChange, label = "รูปภาพ", aspect = "aspect-square" }) {
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file) {
    if (!file) return;
    setError("");
    setLoading(true);
    try {
      const { url } = await uploadImage(file);
      onChange(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <label className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-ink-dim">{label}</label>
      <div
        role="button"
        tabIndex={0}
        className={`relative ${aspect} w-full max-w-[220px] cursor-pointer overflow-hidden rounded-xl border border-dashed border-archive-line bg-archive-bg transition-colors hover:border-amber`}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files?.[0]);
        }}
      >
        {value ? (
          <img src={assetUrl(value)} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-ink-faint">
            <Upload size={20} />
            <span className="px-2 text-center text-[11px] leading-snug">คลิกหรือลากรูปมาวาง</span>
          </div>
        )}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <Loader2 className="animate-spin" size={20} />
          </div>
        )}
      </div>
      {error && <p className="mt-1 max-w-[220px] text-xs text-red-400">{error}</p>}
    </div>
  );
}
