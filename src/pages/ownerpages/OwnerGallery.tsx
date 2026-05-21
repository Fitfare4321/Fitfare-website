import { useState } from "react";
import OwnerLayout from "./components/OwnerLayout";
import { galleryImages } from "./data/dummyData";
import { Upload, X, ZoomIn } from "lucide-react";

export default function OwnerGallery() {
  const [images, setImages] = useState(galleryImages);
  const [preview, setPreview] = useState<typeof galleryImages[0] | null>(null);

  return (
    <OwnerLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gym Images Gallery</h1>
        <button className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition">
          <Upload size={16} /> Upload Gym Images
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map(img => (
          <div key={img.id} className="relative group rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer"
            onClick={() => setPreview(img)}>
            <img src={img.url} alt={img.label} className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
              <ZoomIn size={24} className="text-white opacity-0 group-hover:opacity-100 transition" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <p className="text-white text-xs font-medium">{img.label}</p>
            </div>
            <button onClick={(e) => { e.stopPropagation(); setImages(images.filter(i => i.id !== img.id)); }}
              className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <X size={12} className="text-white" />
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {preview && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setPreview(null)}>
          <div className="relative max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <img src={preview.url} alt={preview.label} className="w-full rounded-xl" />
            <p className="text-white text-center mt-3 font-medium">{preview.label}</p>
            <button onClick={() => setPreview(null)}
              className="absolute top-3 right-3 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40">
              <X size={16} className="text-white" />
            </button>
          </div>
        </div>
      )}
    </OwnerLayout>
  );
}
