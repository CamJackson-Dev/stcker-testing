import {
  TableRow,
  TableCell,
  Box,
  Collapse,
  Table,
  TableBody,
  TableHead,
  Typography,
  IconButton,
} from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import React, { useState } from "react";
import { Order, OrderItem } from "../../utils/types/order";
import { useStyles } from "./styles";

interface Props {
  row: Order;
}

interface ItemCell {
  id: keyof OrderItem;
  label: string;
}

const itemCells: ItemCell[] = [
  {
    id: "_id",
    label: "Id",
  },
  {
    id: "name",
    label: "Name",
  },
  {
    id: "quantity",
    label: "Quantity",
  },
  {
    id: "price",
    label: "Unit Price ($)",
  },
];

const EnhancedTableRow: React.FC<Props> = ({ row }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <>
      <TableRow hover aria-checked={false} tabIndex={-1}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row._id}</TableCell>
        <TableCell align="left">{row.grossAmount}</TableCell>
        <TableCell
          className={
            row.paymentStatus === "COMPLETED" ? classes.success : classes.error
          }
          align="left"
        >
          {row.paymentStatus}
        </TableCell>
        <TableCell
          align="left"
          className={
            row.orderStatus === "DELIVERED" ? classes.success : classes.info
          }
        >
          {row.orderStatus}
        </TableCell>
        <TableCell align="left">
          {new Date(row.createdAt).toLocaleDateString()}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom>
                ITEMS
              </Typography>
              <Table size="small" aria-label="items">
                <TableHead>
                  <TableRow>
                    {itemCells.map((cell) => (
                      <TableCell align="left" key={cell.id}>
                        {cell.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.items.map((item) => (
                    <TableRow key={item._id}>
                      {itemCells.map((cell) => (
                        <TableCell align="left" key={cell.id}>
                          {item[cell.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Typography variant="h6" style={{ marginTop: "1rem" }}>
                SHIPPING DETAILS
              </Typography>
              <Typography>{row.shippingDetails.fullname}</Typography>
              <Typography>{row.shippingDetails.email}</Typography>
              <Typography>{row.shippingDetails.address}</Typography>
              <Typography>
                {row.shippingDetails.city} {row.shippingDetails.state}{" "}
                {row.shippingDetails.postalCode}
              </Typography>
              <Typography>{row.shippingDetails.country}</Typography>
              <Typography>{row.shippingDetails.phoneNumber}</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default EnhancedTableRow;
