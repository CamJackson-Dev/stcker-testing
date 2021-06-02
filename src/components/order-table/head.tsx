import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import React from "react";
import { useStyles } from "./styles";
import { Data } from "./data";

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: "asc" | "desc";
  orderBy: string;
}

interface HeadCell {
  id: keyof Data;
  label: string;
}

const headCells: HeadCell[] = [
  { id: "_id", label: "Id" },
  { id: "grossAmount", label: "Total ($)" },
  { id: "paymentStatus", label: "Payment Status" },
  { id: "orderStatus", label: "Order Status" },
  { id: "createdAt", label: "Date Ordered" },
];

export default function EnhancedTableHead(props: EnhancedTableProps) {
  const classes = useStyles();
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell />
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
