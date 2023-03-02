import styled from "@emotion/styled";
import {
  Button,
  ButtonProps,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import CachedIcon from "@mui/icons-material/Cached";
import { Box } from "@mui/material";
import * as Api from "../../services/api";
import { toast } from "react-toastify";
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#EE2B70",
  backgroundColor: "#FDE7EF",
  "&:hover": {
    backgroundColor: "#EE2B70",
    color: "white",
  },
}));

const label = { inputProps: { "aria-label": "Color switch demo" } };

const CheckCardValidation = (props: any) => {
  console.log({props});
  const [loading, setLoading] = useState(false);
  const [cardStatus, setCardStatus] = useState<any>();

  const checkCard = async () => {
    setLoading(true);
    let expiry_date = moment(props?.expiryDate).format("MM|YY");
    let str: any = `${props?.cardNumber}|${expiry_date}|0${props?.cvv}`;
    console.log({str});
    let cardDetailsB64 = window.btoa(str);
    const [err, res] = await Api.checkCard(cardDetailsB64);
    if (err) {
      toast.error("Something went wrong.Try after sometimes!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if (res) {
      setCardStatus(res?.data?.status);
    }
    setLoading(false);
  };

  const onClickHandler = () => {
    checkCard();
  };

  const onClickRecheckHandler = () => {
    checkCard();
  };

  const showCardDetails = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props?.setShowCard(event.target.checked);
    const [err, res] = await Api.updateOrderRefundStatus(props?.orderId);
    if (res) {
      console.log(res, "updateOrderStatus Refund res");
    }
  };
  return (
    <Box sx={{ display: "flex", gap: 5 }}>
      {/* CARD STATUS == "UNDEFINED || "" */}
      {cardStatus === undefined || cardStatus === "" ? (
        <>
          {loading ? (
            <Box sx={{ mt: 1 }}>
              <CircularProgress size={20} />
            </Box>
          ) : (
            <ColorButton
              variant="contained"
              // startIcon={<CachedIcon />}
              onClick={onClickHandler}
            >
              Check
            </ColorButton>
          )}

          <Switch {...label} disabled />
        </>
      ) : (
        <></>
      )}

      {/* CARD STATUS == "LIVE" */}
      {cardStatus === "LIVE" ? (
        <>
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: "medium",
              color: "green",
              fontWeight: "bold",
              mt: 1,
            }}
          >
            {cardStatus}
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={props?.showCard}
                  onChange={showCardDetails}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Check details"
            />
          </FormGroup>
        </>
      ) : (
        <></>
      )}
      {/* CARD STATUS == "ERROR" */}
      {cardStatus === "ERROR" ? (
        <>
          {loading ? (
            <Box sx={{ mt: 1 }}>
              <CircularProgress size={20} />
            </Box>
          ) : (
            <ColorButton
              variant="contained"
              startIcon={<CachedIcon />}
              onClick={onClickRecheckHandler}
            >
              Recheck
            </ColorButton>
          )}
          <Switch {...label} disabled />
        </>
      ) : (
        <></>
      )}
      {/* CARD STATUS == "DECLINED" || "INVALID" */}
      {cardStatus === "DECLINED" || cardStatus === "INVALID" ? (
        <>
          <Typography
            variant="subtitle2"
            sx={{
              fontSize: "medium",
              color: "red",
              fontWeight: "bold",
              mt: 1,
            }}
          >
            {cardStatus}
          </Typography>
          <Switch {...label} disabled />
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default CheckCardValidation;
