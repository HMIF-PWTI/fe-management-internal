import { TableProps } from "./types";

const Table = <T extends Record<string, any>>({ data, columns }: TableProps<T>) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-lg border border-dark-tertiary">
        <div className="min-w-[800px]">
          <table className="w-full bg-dark-primary">
            <thead className="bg-dark-secondary">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className={`px-6 py-3 text-center text-xs font-medium text-text-secondary uppercase tracking-wider ${
                      column.className || ""
                    }`}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-tertiary">
              {data.map((item, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-dark-secondary transition-colors">
                  {columns.map((column, colIndex) => (
                    <td
                      key={`${rowIndex}-${colIndex}`}
                      className={`px-6 py-4 text-center whitespace-nowrap text-sm ${
                        column.key === "nama"
                          ? "text-gold font-medium"
                          : "text-text-secondary"
                      } ${column.className || ""}`}
                    >
                      {column.render
                        ? column.render(
                            column.key === "no" ? rowIndex + 1 : item[column.key],
                            item
                          )
                        : column.key === "no"
                        ? rowIndex + 1
                        : item[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
