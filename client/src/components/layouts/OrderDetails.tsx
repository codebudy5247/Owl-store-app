import React, { useState, useEffect } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import {
  Box,
  Typography,
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
import CheckCard from "./CheckCard";
import OrderDetailsCardNumber from "./OrderDetailsCardNumber";
import OrderDetailsCvv from "./OrderDetailsCvv";
import OrderDetailsExpiryDate from "./OrderDetailsExpiryDate";

const displayIcon = (type: any) => {
  if (type === "master")
    return <Icon icon="logos:mastercard" height={40} width={40} />;
  if (type === "visa") return <Icon icon="logos:visa" height={40} width={40} />;
  if (type === "discover")
    return <Icon icon="logos:discover" height={40} width={40} />;
};

const OrderDetails = (props: any) => {
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps["maxWidth"]>("md"); //xs,sm,md,false,lg,xl
  let userRole: string = localStorage.getItem("userRole")!;

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
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" sx={{ font: "bold" }}>
                Order Id
              </Typography>
              <Typography variant="h6">{props?.orderDetail?._id}</Typography>
            </Box>

            <Typography variant="h6" sx={{ font: "bold", mt: 2 }}>
              Ordered Items:
            </Typography>
            <br />
            <Container
              sx={{
                mt: 1,
                mb: 2,
                width:"100%"
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
                      {userRole === "ROLE_USER" ? (
                        <TableCell>Card status</TableCell>
                      ) : (
                        <></>
                      )}
                      <TableCell>Country</TableCell>
                      <TableCell>State</TableCell>
                      <TableCell>City</TableCell>
                      <TableCell>Street</TableCell>
                      <TableCell>Zip</TableCell>
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
                          <TableCell>
                            {/* {displayIcon(item.item.type)} */}
                              {/* {item.item?.cardNumber} */}
                              <OrderDetailsCardNumber
                                orderId={props?.orderDetail?._id}
                                cardNumber={item?.item?.cardNumber}
                                expiryDate={item?.item?.expiryDate}
                                cvv={item?.item?.cvv}
                              />
                            
                          </TableCell>
                          <TableCell>
                            {/* {moment(item.item?.expiryDate).format("MM-YYYY")} */}
                            <OrderDetailsExpiryDate
                              orderId={props?.orderDetail?._id}
                              cardNumber={item.item?.cardNumber}
                              expiryDate={item.item?.expiryDate}
                              cvv={item.item?.cvv}
                            />
                          </TableCell>
                          <TableCell>
                            {/* {item.item?.cvv} */}
                            <OrderDetailsCvv
                              orderId={props?.orderDetail?._id}
                              cardNumber={item.item?.cardNumber}
                              expiryDate={item.item?.expiryDate}
                              cvv={item.item?.cvv}
                            />
                          </TableCell>
                          <TableCell>฿{item.item?.price}</TableCell>
                          {userRole === "ROLE_USER" ? (
                            <TableCell>
                              <CheckCard
                                cardNumber={item.item?.cardNumber}
                                expiryDate={item.item?.expiryDate}
                                cvv={item.item?.cvv}
                                refundStatus={props?.orderDetail?.refund_status}
                              />
                            </TableCell>
                            
                          ) : (
                            <></>
                          )}
                           <TableCell>{item.item?.address?.country}</TableCell>
                           <TableCell>{item.item?.address?.state}</TableCell>
                           <TableCell>{item.item?.address?.city}</TableCell>
                           <TableCell>{item.item?.address?.street}</TableCell>
                           <TableCell>{item.item?.address?.zip}</TableCell>
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
  );
};

export default OrderDetails;
