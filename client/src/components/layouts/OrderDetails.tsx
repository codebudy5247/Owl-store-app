import React, { useState, useEffect } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Autocomplete,
  Container,
  TableContainer,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Icon } from "@iconify/react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";

const displayIcon = (type: any) => {
    if (type === "master")
      return <Icon icon="logos:mastercard" height={40} width={40} />;
    if (type === "visa") return <Icon icon="logos:visa" height={40} width={40} />;
    if (type === "discover")
      return <Icon icon="logos:discover" height={40} width={40} />;
  };

const OrderDetails = (props:any) => {
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("md"); //xs,sm,md,false,lg,xl
  return (
    <div>
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <DialogTitle id="alert-dialog-title">
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={props?.handleClose}>
            <CloseIcon />
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ p: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ font: "bold" }}>
              Order Id
            </Typography>
            <Typography variant="h6">{props?.orderDetail?._id}</Typography>
          </Box>

          <Box
            sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
          >
            <Typography variant="h6" sx={{ font: "bold" }}>
              Payment Staus
            </Typography>
            <Box sx={{ display: "flex" }}>
              {props?.orderDetail?.isPaid.toString() === "true" ? (
                <>
                  <Icon
                    icon="fluent-mdl2:completed-solid"
                    height={40}
                    width={40}
                    color="green"
                  />
                  <Typography
                    variant="subtitle2"
                    noWrap
                    sx={{ fontSize: "medium", ml: 2,mt:1 }}
                  >
                    Paid
                  </Typography>
                </>
              ) : (
                <>
                  <Icon
                    icon="material-symbols:pending-actions"
                    height={40}
                    width={40}
                    color="lightblue"
                  />
                  <Typography
                    variant="subtitle2"
                    noWrap
                    sx={{ fontSize: "medium", ml: 2 ,mt:1}}
                  >
                    Payment pending
                  </Typography>
                </>
              )}
            </Box>
          </Box>

          <Box
            sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
          >
            <Typography variant="h6" sx={{ font: "bold" }}>
              Status
            </Typography>
            <Typography variant="h6">{props?.orderDetail?.status}</Typography>
          </Box>

          <Typography variant="h6" sx={{ font: "bold", mt: 2 }}>
            Ordered Items:
          </Typography>
          <br />
          <Container
            maxWidth="xl"
            sx={{
              mt: 1,
              mb: 2,
            }}
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Card No</TableCell>
                    <TableCell>Expiry Date</TableCell>
                    <TableCell>CVV</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props?.orderDetail?.items?.length > 0 &&
                    props?.orderDetail?.items?.map((item: any) => (
                      <TableRow
                        key={item.item._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          // cursor: "pointer",
                        }}
                      >
                        <TableCell sx={{ display: "flex" }}>
                          {displayIcon(item.item.type)}
                          <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{ ml: 1, mt: 1 }}
                          >
                            {item.item?.cardNumber}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {moment(item.item?.expiryDate).format("DD-MM-YYYY")}
                        </TableCell>
                        <TableCell>{item.item?.cvv}</TableCell>
                        <TableCell>฿{item.item?.price}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Box>
      </DialogContent>
    </Dialog>
  </div>
  )
}

export default OrderDetails