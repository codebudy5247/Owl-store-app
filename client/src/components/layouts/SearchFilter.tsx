import React from "react";
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
  Button,
} from "@mui/material";
import { countries } from "../../_mock/_countries";
import { USAstates } from "../../_mock/_usStates";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import SearchIcon from '@mui/icons-material/Search';

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

const SearchFilter = () => {
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

          {/* <Box>
            <Button
              variant="contained"
                startIcon={<RotateLeftIcon />}
            >
              Reset
            </Button>
            <Button
              variant="contained"
                startIcon={<SearchIcon />}
              sx={{ marginLeft: "30px" }}
            >
              Search
            </Button>
          </Box> */}
        </Box>

        <Box sx={{mt:3}}>
          <Stack spacing={3}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
              <TextField fullWidth id="base" label="Base" variant="outlined" />
              <Autocomplete
                fullWidth
                id="country-select-demo"
                // sx={{ width: 400 }}
                options={countries}
                // onChange={onChangeCountryCode}
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
              <Autocomplete
                fullWidth
                id="country-select-demo"
                options={classOption}
                // onChange={onChangeCountryCode}
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
              <TextField fullWidth id="bins" label="Bins" variant="outlined" />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
              <Autocomplete
                fullWidth
                id="country-select-demo"
                options={USAstates}
                // onChange={onChangeCountryCode}
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
                    label="Only for USA"
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
                // onChange={onChangeCountryCode}
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
              <TextField
                fullWidth
                id="zip"
                label="Zip code"
                variant="outlined"
              />
              <TextField fullWidth id="city" label="City" variant="outlined" />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
              <TextField fullWidth id="type" label="Type" variant="outlined" />
              <TextField
                fullWidth
                id="bankname"
                label="Bank name"
                variant="outlined"
              />
            </Stack>
          </Stack>
        </Box>
      </Card>
    </Container>
  );
};

export default SearchFilter;
