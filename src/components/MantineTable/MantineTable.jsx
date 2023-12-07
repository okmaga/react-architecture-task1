import { Table } from "@mantine/core";
import { IconArrowUp, IconArrowDown } from "@tabler/icons-react";
import "./Table.module.css";

export function MantineTable({ data, onSort, sortBy, onClick }) {
  const columns = Object.keys(data[0]);
  const renderContent = (item, col) => {
    if (col === "created" || col === "air_date") {
      const date = new Date(item[col]);
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    } else {
      return item[col];
    }
  };

  const handleClick = (item) => {
    onClick(item);
  };

  const handleSort = (column) => {
    if (!sortBy) {
      return;
    }
    const currentSort = sortBy.get("sortBy");
    const currentOrder = sortBy.get("order");
    if (currentSort === column) {
      onSort({
        sortBy: column,
        order: currentOrder === "asc" ? "desc" : "asc"
      });
    } else {
      onSort({
        sortBy: column,
        order: "asc"
      });
    }
  };

  const renderSortArrow = (col) => {
    if (!sortBy) {
      return;
    }
    const currentSort = sortBy.get("sortBy");
    const currentOrder = sortBy.get("order");
    if (col === currentSort) {
      return currentOrder === "asc" ? <IconArrowUp /> : <IconArrowDown />;
    }
  };

  return (
    <Table stickyHeader stickyHeaderOffset={45}>
      <Table.Thead>
        <Table.Tr>
          {columns.map((col) => {
            if (
              (col === "characters") |
              (col === "url") |
              (col === "residents")
            ) {
              return null;
            }
            return (
              <Table.Th key={col} onClick={() => handleSort(col)}>
                {col}
                <span>{renderSortArrow(col)}</span>
              </Table.Th>
            );
          })}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Object.values(data).map((item) => {
          return (
            <Table.Tr
              key={item.id || item.name}
              onClick={() => handleClick(item)}
            >
              {columns.map((col) => {
                if (
                  (col === "characters") |
                  (col === "url") |
                  (col === "residents")
                ) {
                  return null;
                }
                return (
                  <Table.Td key={col}>{renderContent(item, col)}</Table.Td>
                );
              })}
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  );
}
