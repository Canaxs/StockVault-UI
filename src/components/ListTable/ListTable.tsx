import { Spinner } from "../Spinner/Spinner";

type Column = {
  key: string;
  label: string;
  render?: (item: any) => React.ReactNode;
};

interface DataTableProps {
  columns: Column[];
  data: any[];
  title?: string;
}

export const ListTable: React.FC<DataTableProps> = ({
  columns,
  data,
  title,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-5 text-gray-500">
        {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
        <Spinner size="lg" color="text-purple-500" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full">
      {title && (
        <h3 className="text-xl font-medium mb-4 text-gray-700">{title}</h3>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left table-auto border-separate border-spacing-0">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col: any) => (
                <th
                  key={col.key}
                  className="p-3 text-sm font-medium text-gray-600 uppercase tracking-wider border-b border-gray-200"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-4 text-center text-gray-400"
                >
                  Henüz veri bulunmuyor.
                </td>
              </tr>
            )}
            {data.map((item: any, idx: number) => (
              <tr
                key={idx}
                className={`transition-colors duration-200 hover:bg-gray-50 ${
                  idx % 2 === 0 ? "bg-gray-50/50" : ""
                }`}
              >
                {columns.map((col: any) => (
                  <td
                    key={col.key}
                    className="p-3 text-sm text-gray-700 truncate max-w-xs"
                    title={item[col.key]} // Hover'da full text göster
                  >
                    {col.render ? col.render(item) : item[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
