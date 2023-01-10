import { Box, Stack, TextField, Autocomplete } from "@mui/material";
import React, { useState } from "react";
import { countries } from "../../_mock/_countries";
import { USAstates } from "../../_mock/_usStates";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment";
import * as Api from "../../services/api";

import { AddCardRequestPayload } from "../../services/api";
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "white",
  backgroundColor: "#EE2B70",
  "&:hover": {
    backgroundColor: "#EE2B70",
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
const AddCard = () => {
  const [ccNumber, setCcNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [CVV, setCVV] = useState("");
  const [street, setStreet] = useState("");
  const [mobile, setMobile] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [dl, setDl] = useState("");
  const [ssn, setSsn] = useState("");
  const [class_option, setClassOption] = useState("");
  const [label, setLabel] = useState("");
  const [otherDetails, setOtherDetails] = useState("");
  const [price, setPrice] = useState("");
  const [bankName, setBankName] = useState("");
  const onChangeCCNumber = (e: any) => {
    setCcNumber(e.target.value);
  };
  const onChangeExpiryDate = (e: any) => {
    let date = moment(e.target.value).toISOString(); //ISO 8601 format
    setExpiryDate(date);
  };
  const onChangeCVV = (e: any) => {
    setCVV(e.target.value);
  };
  const onChangeStreet = (e: any) => {
    setStreet(e.target.value);
  };
  const onChangeMobile = (e: any) => {
    setMobile(e.target.value);
  };
  const onChangeZip = (e: any) => {
    setZip(e.target.value);
  };
  const onChangeCountry: any = (e: any, values: any) => {
    setCountry(values.code);
  };
  const onChangeState: any = (e: any, values: any) => {
    setState(values.code);
  };
  const onChangeCity = (e: any) => {
    setCity(e.target.value);
  };
  const onChangeDl = (e: any) => {
    setDl(e.target.value);
  };
  const onChangeSsn = (e: any) => {
    setSsn(e.target.value);
  };
  const onChangeClass: any = (e: any, values: any) => {
    setClassOption(values.value);
  };
  const onChangeLabel: any = (e: any, values: any) => {
    setLabel(values.value);
  };
  const onChangeOtherDetails = (e: any) => {
    setOtherDetails(e.target.value);
  };
  const onChangePrice = (e: any) => {
    setPrice(e.target.value);
  };
  const onChangeBankName = (e: any) => {
    setBankName(e.target.value);
  };

  const OnSubmit = async () => {
    const payloadObj: AddCardRequestPayload = {
      street: street,
      country: country,
      state: state,
      city: city,
      zip: zip,
      mobile: mobile,
      cardNumber: ccNumber,
      expiryDate: expiryDate,
      cvv: CVV,
      socialSecurityNumber: ssn,
      drivingLicenceNumber: dl,
      level: label,
      class: class_option,
      price: price,
      bankName: bankName,
      type: "visa",
    };

    const [err, res] = await Api.createCard(payloadObj);
    if (res) {
      console.log({ res });
    }
  };

  return (
    <>
      <Stack spacing={2} sx={{ mt: 2 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          {/* Card Number */}
          <TextField
            required={true}
            fullWidth
            id="base"
            label="CC Number"
            variant="outlined"
            onChange={onChangeCCNumber}
          />
          {/* Expiry Date */}
          {/* <TextField
            type="month"
            fullWidth
            id="base"
            label="Expiry Date"
            variant="outlined"
            // value="2018-8"
            InputLabelProps={{ shrink: true, required: true }}
            onChange={onChangeExpiryDate}
          /> */}
          <label>Expiry Date</label>
          <input
            width={150}
            type="month"
            id="start"
            name="start"
            min="2022-01"
            defaultValue="2022-01"
            onChange={onChangeExpiryDate}
          ></input>
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          {/* CVV */}
          <TextField
            required={true}
            fullWidth
            id="base"
            label="CVV"
            variant="outlined"
            onChange={onChangeCVV}
          />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          {/* street */}
          <TextField
            required={true}
            fullWidth
            id="street"
            label="Street"
            variant="outlined"
            onChange={onChangeStreet}
          />
          {/* Mobile */}
          <TextField
            required={true}
            fullWidth
            id="mobile"
            label="Phone number"
            variant="outlined"
            onChange={onChangeMobile}
          />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          {/* Zip code */}
          <TextField
            required={true}
            fullWidth
            id="base"
            label="Zip Code"
            variant="outlined"
            onChange={onChangeZip}
          />
          {/* Country */}
          <Autocomplete
            fullWidth
            id="country-select-demo"
            // sx={{ width: 400 }}
            options={countries}
            onChange={onChangeCountry}
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
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          {/* States */}
          <Autocomplete
            fullWidth
            id="country-select-demo"
            options={USAstates}
            onChange={onChangeState}
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
                label="States"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
          {/* City */}
          <TextField
            required={true}
            fullWidth
            id="zip"
            label="City"
            variant="outlined"
            onChange={onChangeCity}
          />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          {/* DL */}
          <TextField
            required={true}
            fullWidth
            id="zip"
            label="Driving Licence Number"
            variant="outlined"
            onChange={onChangeDl}
          />
          {/* SSN */}
          <TextField
            required={true}
            fullWidth
            id="ssn"
            label="Social Security Number"
            variant="outlined"
            onChange={onChangeSsn}
          />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          {/* Class */}
          <Autocomplete
            fullWidth
            id="country-select-demo"
            options={classOption}
            onChange={onChangeClass}
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
          {/* Label */}
          <Autocomplete
            fullWidth
            id="country-select-demo"
            options={levelOption}
            onChange={onChangeLabel}
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
                label="Label"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          {/* ODetails */}
          <TextField
            required={true}
            fullWidth
            id="od"
            label="Other Details.."
            variant="outlined"
            onChange={onChangeOtherDetails}
          />
          <TextField
            required={true}
            fullWidth
            id="od"
            label="Price"
            variant="outlined"
            onChange={onChangePrice}
          />
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
          <TextField
            required={true}
            fullWidth
            id="bankName"
            label="Bank Name"
            variant="outlined"
            onChange={onChangeBankName}
          />
        </Stack>
      </Stack>
      {/* Submit Btn */}
      <ColorButton
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ mt: 3 }}
        onClick={OnSubmit}
      >
        Add
      </ColorButton>
    </>
  );
};

export default AddCard;
