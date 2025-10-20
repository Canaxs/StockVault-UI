import React, { useState } from "react";
import { Spinner } from "../Spinner/Spinner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Modal from "react-responsive-modal";
import { Button } from "../Form/Button";

type Column = {
  key: string;
  label: string;
  render?: (item: any) => React.ReactNode;
};

interface DataTableProps {
  columns: Column[];
  data: any[];
  title?: string;
  totalCount?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;

  renderModalContent?: (item: any) => React.ReactNode;
}

export const PaginateTable: React.FC<DataTableProps> = ({
  columns,
  data,
  title,
  totalCount = 0,
  hasNext = false,
  hasPrevious = false,
  onNext,
  onPrevious,
  renderModalContent,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const onCloseModal = () => setOpen(false);

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-5 text-gray-500">
        {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
        <Spinner size="lg" color="text-purple-500" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full flex flex-col">
      {title && (
        <h3 className="text-base md:text-lg lg:text-xl font-medium mb-4 text-gray-700">
          {title}
        </h3>
      )}

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left table-auto border-separate border-spacing-0">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="p-3 text-xs md:text-sm font-medium text-gray-600 uppercase tracking-wider border-b border-gray-200"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr
                key={idx}
                onClick={() => {
                  setSelectedItem(item);
                  setOpen(true);
                }}
                className={`transition-colors duration-200 hover:bg-gray-50 cursor-pointer ${
                  idx % 2 === 0 ? "bg-gray-50/50" : ""
                }`}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="p-3 text-xs md:text-sm text-gray-700 truncate max-w-xs"
                    title={item[col.key]}
                  >
                    {col.render ? col.render(item) : item[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="text-xs md:text-sm text-gray-600">
          Toplam {totalCount} kayıt listeleniyor
        </div>
        <div className="flex gap-2">
          <button
            onClick={onPrevious}
            disabled={!hasPrevious}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
              hasPrevious
                ? "bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
                : "bg-gray-50 text-gray-400 cursor-no-drop"
            }`}
          >
            <ChevronLeft size={16} />
            Geri
          </button>
          <button
            onClick={onNext}
            disabled={!hasNext}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
              hasNext
                ? "bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
                : "bg-gray-50 text-gray-400 cursor-no-drop"
            }`}
          >
            İleri
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <Modal open={open} onClose={onCloseModal} center>
        {selectedItem &&
          (renderModalContent ? (
            renderModalContent(selectedItem)
          ) : (
            <div className="p-5">
              <h2 className="font-semibold text-lg">Detay</h2>
              <pre className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                {JSON.stringify(selectedItem, null, 2)}
              </pre>
              <Button
                onClick={onCloseModal}
                variant="secondary"
                className="mt-4"
              >
                Kapat
              </Button>
            </div>
          ))}
      </Modal>
    </div>
  );
};
