import React, { useState,useEffect } from "react";
import {
  Card,
  Container,
  Box,
  Typography,
  Stack,
  TextField,
  Chip,
  Autocomplete,
  InputLabel,
  getSpeedDialActionUtilityClass,
  Table,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableSortLabel,
} from "@mui/material";
import { countries } from "../../_mock/_countries";
import { USAstates } from "../../_mock/_usStates";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import SearchIcon from "@mui/icons-material/Search";
import { Icon } from "@iconify/react";
import moment from "moment";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { toast } from "react-toastify";
import * as Api from "../../services/api";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#EE2B70",
  backgroundColor: "#FDE7EF",
  "&:hover": {
    backgroundColor: "#EE2B70",
    color: "white",
  },
}));



const classOption = [
  {
    value: "credit",
    label: "Credit",
  },
  {
    value: "debit",
    label: "Debit",
  },
];

const levelOption = [
  {
    value: "classic",
    label: "Classic",
  },
  {
    value: "platinum",
    label: "Platinum",
  },
];
const TABLE_HEAD = [
  { id: "bin", label: "Bin", alignRight: false },
  { id: "base", label: "Base", alignRight: false },
  { id: "zip", label: "Zip", alignRight: false },
  { id: "city", label: "City", alignRight: true },
  { id: "state", label: "State", alignRight: true },
  { id: "country", label: "Country", alignRight: true },
  { id: "lavel", label: "Lavel", alignRight: true },
  { id: "class", label: "Class", alignRight: true },
  // { id: "extra", label: "Extra", alignRight: true },
  { id: "price", label: "Price", alignRight: true },
  { id: "cart", label: "", alignRight: true },
];
const SearchFilter = (props: any) => {
  const [country, setCountry] = useState("");
  const [lebel, setLebel] = useState("");
  const [class_option, setClassOption] = useState("");
  const [bin, setBin] = useState("");
  const [type, setType] = useState("");
  const [city, setCity] = useState("");

  const displayIcon = (type: any) => {
    if (type === "master")
      return <Icon icon="logos:mastercard" height={40} width={40} />;
    if (type === "visa")
      return <Icon icon="logos:visa" height={40} width={40} />;
    if (type === "discover")
      return <Icon icon="logos:discover" height={40} width={40} />;
  };

  const [cartItems, setCartItems] = useState<any>();

  const [disabled, setDisabled] = useState(false);

  

  //Check item is present or not in the cart.
  function checkItem(arr: any, item_id: string) {
    const found = arr?.some((el: any) => el.itemId._id === item_id);
    if (found) return true;
  }

  const addToCart = async (item_id: string) => {
    let itemIsPresentOrNot = checkItem(cartItems, item_id);

    if (itemIsPresentOrNot === true) {
      toast.info("This item already exist in your cart.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const [addToCartError, addToCartResponse] = await Api.addToCart(item_id);
      if (addToCartError) {
        toast.error("Something went wrong.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (addToCartResponse) {
        toast.success("Item successfully added to cart.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  useEffect(() => {
    const getCart = async () => {
      const [getUserCartErr, getUserCartRes] = await Api.getCartItems();
      if (getUserCartErr) {
        toast.error("Something went wrong.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setCartItems(getUserCartRes?.data?.cart);
    };
    getCart();
  }, []);

  // const filterList = props?.cardList?.filter(
  //   (val: any) => val?.address?.city === city
  // );

  // console.log("filterList", filterList);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Card sx={{ borderRadius: 5, p: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ fontWeight: 500, fontSize: "42px" }}>
              Search
            </Typography>{" "}
            <Typography
              sx={{
                color: "#EE2B70",
                ml: 1,
                fontWeight: 500,
                fontSize: "42px",
                // fontFamily: "poppins",
              }}
            >
              Filters
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Stack spacing={3}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
              <Autocomplete
                fullWidth
                id="country-select-demo"
                // sx={{ width: 400 }}
                options={countries}
                onChange={(e: any, values: any) => setCountry(values.code)}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    {option.label} ({option.code})
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
              <Autocomplete
                fullWidth
                id="country-select-demo"
                options={levelOption}
                onChange={(e: any, values: any) => setLebel(values.value)}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Lavel"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
              <Autocomplete
                fullWidth
                id="country-select-demo"
                options={classOption}
                onChange={(e: any, values: any) => setClassOption(values.value)}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {option.label}
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Class"
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
              <TextField
                fullWidth
                id="bins"
                label="Bins"
                variant="outlined"
                onChange={(e: any) => setBin(e.target.value)}
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
              <TextField
                fullWidth
                id="type"
                label="Type"
                variant="outlined"
                onChange={(e: any) => setType(e.target.value)}
              />
              <TextField
                fullWidth
                id="city"
                label="City"
                variant="outlined"
                onChange={(e: any) => setCity(e.target.value)}
              />
            </Stack>
          </Stack>
        </Box>
      </Card>

      {/* Card List */}

      <Card sx={{ borderRadius: 5, p: 3, mt: 4, mb: 4 }}>
        {props?.cardList?.length === 0 || props?.cardList === undefined ? (
          <Typography
            variant="h4"
            sx={{ textAlign: "center", color: "#EE2B70", fontWeight: 600 }}
          >
            No Cards Found!
          </Typography>
        ) : (
          <>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {TABLE_HEAD?.map((headCell) => (
                      <TableCell key={headCell.id}>
                        <TableSortLabel hideSortIcon>
                          {headCell.label}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {props?.cardList
                    ?.filter((val: any) => {
                      if (
                        country === "" &&
                        lebel === "" &&
                        class_option === "" &&
                        bin === "" &&
                        type === "" &&
                        city === ""
                      ) {
                        return val;
                      } else if (
                        val?.address?.country === country ||
                        val?.level === lebel ||
                        val?.class === class_option ||
                        val?.cardNumber === bin ||
                        val?.type === type ||
                        val?.address?.city === city
                      ) {
                        return val;
                      }
                    })
                    .map((card: any) => (
                      <TableRow key={card?._id}>
                        <TableCell sx={{ display: "flex" }}>
                          {displayIcon(card.type)}
                          <Typography
                            variant="subtitle2"
                            noWrap
                            sx={{ ml: 1, mt: 1 }}
                          >
                            {card?.cardNumber?.slice(0, 6)}
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
                            <Typography variant="subtitle2" noWrap>
                              {moment(card?.base).format("MMMM YY")}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            {card?.address?.zip}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            {card?.address?.city}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            {card?.address?.state}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <img
                            loading="lazy"
                            width="50"
                            height="25"
                            src={`https://countryflagsapi.com/png/${card?.address?.country?.toLowerCase()}`}
                            alt=""
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            {card?.level}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            {card?.class}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="subtitle2" noWrap>
                            {card?.price}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ cursor: "pointer" }}>
                    <ColorButton
                      variant="contained"
                      onClick={() => addToCart(card?._id)}
                    >
                      <AddShoppingCartIcon />
                    </ColorButton>
                  </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Card>
    </Container>
  );
};

export default SearchFilter;
