import {
  Stack,
  TextField,
  Typography,
  Box,
  Container,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
} from "@mui/material";
import React, { useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Icon } from "@iconify/react";
import moment from "moment";
import { AddCardRequestPayload } from "../../services/api";
import * as Api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
var XLSX = require("xlsx");

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "white",
  backgroundColor: "#EE2B70",
  "&:hover": {
    backgroundColor: "#EE2B70",
    // color: "white",
  },
}));
const TABLE_HEAD = [
  { id: "bin", label: "Bin", alignRight: false },
  { id: "base", label: "Base", alignRight: false },
  { id: "zip", label: "Zip", alignRight: false },
  { id: "city", label: "City", alignRight: true },
  { id: "state", label: "State", alignRight: true },
  { id: "country", label: "Country", alignRight: true },
  { id: "price", label: "Price", alignRight: true },
];
const displayIcon = (type: any) => {
  if (type === "master")
    return <Icon icon="logos:mastercard" height={40} width={40} />;
  if (type === "visa") return <Icon icon="logos:visa" height={40} width={40} />;
  if (type === "discover")
    return <Icon icon="logos:discover" height={40} width={40} />;
};

const BulkAddCards = () => {
  const navigate = useNavigate()
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [xlsxData, setXlsxData] = useState<any>();

  // console.log("xlsxData______", xlsxData);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e?.target?.result;
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setXlsxData(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click();
  };

  const handleSubmit = async () => {
    for (const item of xlsxData) {
      const payloadObj: AddCardRequestPayload = {
        street: item.street,
        country: item.country,
        state: item.state,
        city: item.city,
        zip: item.zip,
        mobile: item.phoneNo,
        cardNumber: item.cardNumber,
        expiryDate: item.expiryDate,
        cvv: item.cvv,
        socialSecurityNumber: item.socialSecurityNumber,
        drivingLicenceNumber: item.drivingLicenceNumber,
        level: item.level,
        class: item.class,
        price: item.price,
        bankName: item.bankName,
        type: item.type,
      };

      // call add product api
      const [err, res] = await Api.createCard(payloadObj);
      if (err) {
        toast.error("Something went wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      if (res) {
        navigate("/total-cards")
      }
    }
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <ColorButton
          variant="contained"
          startIcon={<FileDownloadIcon />}
          sx={{ mt: 3 }}
          onClick={handleInputFileRefClick}
        >
          Import through xlsx/xls file
        </ColorButton>
        <input
          onChange={handleFileInput}
          type="file"
          id="file"
          ref={inputFileRef}
          style={{ display: "none" }}
        />
      </Box>

      {xlsxData?.length === 0 || xlsxData === undefined ? (
        <></>
      ) : (
        <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
          <TableContainer sx={{ minWidth: 500 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {TABLE_HEAD?.map((headCell: any) => (
                    <TableCell key={headCell.id}>
                      <TableSortLabel hideSortIcon>
                        {headCell.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {xlsxData?.length >0 && xlsxData?.map((card: any) => (
                  <>
                    <TableRow key={card?._id}>
                      <TableCell sx={{ display: "flex" }}>
                        {displayIcon(card?.type)}
                        <Typography
                          variant="subtitle2"
                          noWrap
                          sx={{ ml: 1, mt: 1 }}
                        >
                          {card?.cardNumber}
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
                          {card?.zip}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" noWrap>
                          {card?.city}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" noWrap>
                          {card?.state}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <img
                          loading="lazy"
                          width="50"
                          height="25"
                          src={`https://countryflagsapi.com/png/${card?.country?.toLowerCase()}`}
                          alt=""
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" noWrap>
                          {card?.price}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={5}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <ColorButton
              variant="contained"
              startIcon={<CurrencyExchangeIcon />}
              sx={{ mt: 3 }}
              onClick={handleSubmit}
            >
              Submit
            </ColorButton>
            {/*  */}
          </Stack>
        </Container>
      )}

      {/* <Stack spacing={2} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          id="filled-multiline-static"
          label="Bulk Add"
          multiline
          rows={4}
          // defaultValue="Enter Amount"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="filled-multiline-static"
          label="Price"
          // defaultValue="Enter Amount"
          variant="outlined"
        />
      </Stack> */}
    </>
  );
};

export default BulkAddCards;
