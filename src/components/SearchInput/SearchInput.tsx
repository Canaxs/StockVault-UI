import { Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  results?: any[];
  renderResult?: (item: any) => React.ReactNode;
  onSelect?: (item: any) => void;
}

export function SearchInput({
  placeholder = "Ara...",
  value,
  onChange,
  results = [],
  renderResult,
  onSelect,
}: SearchInputProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setOpen(false);
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30"></div>
      )}

      <div
        ref={containerRef}
        className="flex items-center relative z-40 w-full md:w-72 bg-white border border-gray-300 rounded-lg"
      >
        <Search className="text-gray-400 w-5 h-5 ml-1" />
        <input
          placeholder={placeholder}
          value={value}
          onFocus={() => setOpen(true)}
          onChange={(e) => onChange(e.target.value)}
          className={`p-2 focus:outline-none w-full transition`}
        />

        {open && (
          <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-300 max-h-64 overflow-y-auto animate-fadeIn">
            {results.length === 0 ? (
              <div className="text-gray-400 text-sm text-center py-2">
                Sonuç bulunamadı
              </div>
            ) : (
              results.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    onSelect?.(item);
                    setOpen(false);
                  }}
                  className="p-3 border-b border-gray-300 last:border-none cursor-pointer relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-slate-600 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>

                  <div className="relative z-10 text-gray-800 group-hover:text-white transition-colors duration-300">
                    {renderResult ? renderResult(item) : JSON.stringify(item)}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}
