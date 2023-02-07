import React, { useState, useEffect } from "react";
import {
  Table,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TableHead,
  TableSortLabel,
  Container,
  Card,
  Box,
} from "@mui/material";
import EmptyContent from "../EmptyContent";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";
import { Icon } from "@iconify/react";
import EmptyOrderImg from "../../images/orderimg.png";
import UserDetails from "../UserDetails";
import OrderDetails from "./OrderDetails";
import CheckCard from "./CheckCard";

const TABLE_HEAD = [
  { id: "id", label: "Order Id", alignRight: false },
  { id: "date", label: "Purchase Date", alignRight: false },
  { id: "items", label: "Total Items", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "amount", label: "Total Price", alignRight: true },
  { id: "seller", label: "Seller", alignRight: true },
  { id: "paystatus", label: "Payment Status", alignRight: true },
];

const UserOrders = (props: any) => {
  const displayIcon = (status: any) => {
    if (status === "Placed")
      return (
        <Icon
          icon="material-symbols:pending-actions"
          height={30}
          width={30}
          color="lightblue"
        />
      );
    if (status === "Cancelled")
      return (
        <Icon
          icon="material-symbols:cancel-rounded"
          height={30}
          width={30}
          color="red"
        />
      );
    if (status === "Completed")
      return (
        <Icon
          icon="fluent-mdl2:completed-solid"
          height={30}
          width={30}
          color="green"
        />
      );
  };

  console.log({props})

  const [orderDetail, setOrderDetail] = useState<any>();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const orderDetails = (order: any) => {
    handleOpen();
    setOrderDetail(order);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 3, mb: 5 }}>
      <Card sx={{ borderRadius: 5, p: 3 }}>
        {props?.userOrders?.length === 0 || props?.userOrders === undefined ? (
          <>
            <EmptyContent
              title="You haven't placed any order yet!"
              description="Order section is empty. After placing order, You can track them from here!"
              img={EmptyOrderImg}
            />
          </>
        ) : (
          <>
            {props?.loadingUserOrders ? (
              <Box sx={{ display: "grid", placeContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              <TableContainer sx={{ minWidth: 500 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      {TABLE_HEAD?.map((headCell) => (
                        <TableCell key={headCell.id}>
                          <TableSortLabel hideSortIcon>
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: "bold" }}
                            >
                              {headCell.label}
                            </Typography>
                          </TableSortLabel>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props?.userOrders.map((order: any) => (
                      <>
                        <TableRow
                          sx={{ cursor: "pointer" }}
                          key={order._id}
                          onClick={() => orderDetails(order)}
                        >
                          <TableCell sx={{}}>
                            <Typography
                              variant="subtitle2"
                              noWrap
                              sx={{ fontSize: "medium" }}
                            >
                              {order?._id?.slice(0, 8)} ...
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ p: 2 }}>
                            <Box
                              sx={{
                                backgroundColor: "#FDE7EF",
                                p: 1,
                                textAlign: "center",
                              }}
                            >
                              <Typography
                                variant="subtitle2"
                                noWrap
                                sx={{ fontSize: "medium" }}
                              >
                                {moment(order?.createdAt).format(
                                  "DD-MM-YYYY,h:mm a"
                                )}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{}}>
                            <Typography
                              variant="subtitle2"
                              noWrap
                              sx={{ fontSize: "medium" }}
                            >
                              {order?.items?.length}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{}}>
                            <Box sx={{ display: "flex" }}>
                              {displayIcon(order?.status)}
                              <Typography
                                variant="subtitle2"
                                noWrap
                                sx={{ ml: 1, mt: 0.5, fontSize: "medium" }}
                              >
                                {order?.status}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{}}>
                            <Typography
                              variant="subtitle2"
                              noWrap
                              sx={{ fontSize: "medium" }}
                            >
                              $ {order?.totalPrice}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{}}>
                            <UserDetails userID={order?.seller} />
                          </TableCell>
                          <TableCell sx={{}}>
                            <Box sx={{ display: "flex" }}>
                              {order?.isPaid.toString() === "true" ? (
                                <>
                                  <Icon
                                    icon="fluent-mdl2:completed-solid"
                                    height={30}
                                    width={30}
                                    color="green"
                                  />
                                  <Typography
                                    variant="subtitle2"
                                    noWrap
                                    sx={{ fontSize: "medium", ml: 1 }}
                                  >
                                    Paid
                                  </Typography>
                                </>
                              ) : (
                                <>
                                  <Icon
                                    icon="material-symbols:pending-actions"
                                    height={30}
                                    width={30}
                                    color="lightblue"
                                  />
                                  <Typography
                                    variant="subtitle2"
                                    noWrap
                                    sx={{ fontSize: "medium", ml: 1 }}
                                  >
                                    Payment pending
                                  </Typography>
                                </>
                              )}
                            </Box>
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}
      </Card>
      <OrderDetails
        open={open}
        handleClose={handleClose}
        orderDetail={orderDetail}
      />
    </Container>
  );
};

export default UserOrders;
