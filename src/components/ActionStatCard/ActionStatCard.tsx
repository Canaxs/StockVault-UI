import React, { useState } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { NavLink } from "react-router-dom";
import Modal from "react-responsive-modal";
import { Button } from "../Form/Button";
import { TextInput } from "../Form/TextInput";

interface ActionStatCardProps<T = any> {
  title: string;
  inputLabel?: string;
  placeholder?: string;
  buttonLabel?: string;
  gradient: string;
  link?: string;
  items?: T[];
  columns?: { key: keyof T; label: string }[];
  onSubmit?: (value: string) => void;
}

export function ActionStatCard<T = any>({
  title,
  inputLabel = "Değer",
  placeholder = "Bir değer gir...",
  buttonLabel = "Göster",
  gradient,
  link,
  items = [],
  columns,
  onSubmit,
}: ActionStatCardProps<T>) {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<number | string | null>(null);

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  const toggleExpand = (id: number | string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div
      className={`flex flex-col relative justify-between rounded-2xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all duration-300`}
    >
      <p
        className={`text-transparent bg-clip-text bg-gradient-to-t ${gradient} text-lg mb-3`}
      >
        {title}
      </p>

      <TextInput
        label={inputLabel}
        value={inputValue}
        onChange={(val) => setInputValue(val)}
        inputClassName="h-10 p-3 shadow-sm"
        placeholder={placeholder}
      />

      <Button
        onClick={() => {
          if (onSubmit) onSubmit(inputValue);
          handleOpenModal();
        }}
        variant="secondary"
        className={`mt-4 rounded-xl bg-gradient-to-t ${gradient} w-full hover:shadow-md transition-all duration-300`}
      >
        {buttonLabel}
      </Button>

      {link && (
        <NavLink to={link}>
          <div className="absolute right-2 top-2 w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-all hover:scale-105">
            <ArrowUpRight size={18} />
          </div>
        </NavLink>
      )}

      <Modal open={open} onClose={handleCloseModal} center>
        <div className="flex flex-col gap-3 p-5 min-w-[350px]">
          <h2 className="font-semibold text-lg text-gray-800">
            {title} Listesi
          </h2>

          {items.length === 0 ? (
            <p className="text-gray-400 text-sm mt-3">
              Gösterilecek veri bulunamadı.
            </p>
          ) : (
            <div className="flex flex-col divide-y divide-gray-200">
              {items.map((item: any, idx: number) => (
                <div key={idx} className="py-2">
                  <button
                    className="flex justify-between items-center w-full text-left font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => toggleExpand(idx)}
                  >
                    <span>{item.title || `Öğe ${idx + 1}`}</span>
                    {expandedId === idx ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>

                  {expandedId === idx && (
                    <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {columns
                        ? columns.map((col) => (
                            <p key={String(col.key)}>
                              <strong>{col.label}:</strong> {item[col.key]}
                            </p>
                          ))
                        : item.content || JSON.stringify(item)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
