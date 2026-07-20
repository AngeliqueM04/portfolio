import type { DataTable as DataTableType } from "@/data/content"

type Props = {
  table: DataTableType
}

/**
 * Read-only Excel-like grid for sensitivity and comparison tables.
 *
 * Previewed 21st.dev/@ravikatiyar162/components/excel-style-table before using it.
 * That component is an editable spreadsheet (double-click cells, drag-select,
 * sonner toasts). Wrong for static portfolio figures. Kept the visual idea
 * (header row, grid lines, spreadsheet chrome) as a read-only presentation.
 */
export function DataTable({ table }: Props) {
  return (
    <figure className="overflow-hidden rounded-sm border border-line bg-bg-elevated">
      <figcaption className="border-b border-line px-4 py-2.5 font-serif text-[0.78rem] italic text-fg-muted">
        {table.caption}
      </figcaption>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] border-collapse text-left text-sm">
          <thead>
            <tr className="bg-bg-soft">
              {table.headers.map((header, index) => (
                <th
                  key={header}
                  className={`border-b border-line px-3 py-2 font-medium text-fg ${
                    index === 0 ? "" : "text-right"
                  }`}
                >
                  <span className="mr-2 font-sans text-[0.65rem] uppercase tracking-wider text-fg-faint">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr
                key={`${row[0]}-${rowIndex}`}
                className="odd:bg-bg-elevated even:bg-bg/40"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${rowIndex}-${cellIndex}`}
                    className={`border-b border-line/70 px-3 py-2.5 ${
                      cellIndex === 0
                        ? "font-serif text-fg"
                        : "text-right font-sans tabular-nums text-accent"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  )
}
