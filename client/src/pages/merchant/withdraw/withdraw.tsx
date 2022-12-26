import { Box, Container, Stack, TextField } from "@mui/material";
import React from "react";
import Header from "../../../components/layouts/Header";
import Navbar from "../../../components/Navbar";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Footer from "../../../components/Footer";
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "white",
  backgroundColor: "#EE2B70",
  "&:hover": {
    backgroundColor: "#EE2B70",
    // color: "white",
  },
}));
const withdraw = () => {
  return (
    <>
      <Box>
        <Navbar />
        <Header title="Withdraw" subtitle="Owl Store > Withdraw" />
      </Box>

      <Container maxWidth="lg" sx={{ mt: 5 ,mb:5 }}>
        <Box sx={{ display: "flex", mt: 2 }}>
          <TextField
            fullWidth
            id="base"
            label="Creteria of withdraw - Minimum 50$"
            variant="outlined"
            disabled
            sx={{ borderLeft: "4px solid #EE2B70" }}
          />
        </Box>

        <Stack spacing={2} sx={{ mt: 2 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={5}>
            {/* <TextField
              fullWidth
              id="base"
              label="Amount to withdraw"
              variant="outlined"
            /> */}
            <TextField
              fullWidth
              id="base"
              label="Total Amount to withdraw"
              variant="outlined"
            />
          </Stack>
        </Stack>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <ColorButton
            variant="contained"
            startIcon={<CurrencyExchangeIcon />}
            sx={{ mt: 3 }}
          >
            Submit
          </ColorButton>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default withdraw;
