import styled from "@emotion/styled";
import { Button, ButtonProps, Typography } from "@mui/material";
import moment from "moment";
import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import CachedIcon from "@mui/icons-material/Cached";

import * as Api from "../../services/api";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: "#EE2B70",
    backgroundColor: "#FDE7EF",
    "&:hover": {
      backgroundColor: "#EE2B70",
      color: "white",
    },
  }));
  
const CheckCard = (props: any) => {
    const [loading, setLoading] = useState(false);
    const [cardStatus, setCardStatus] = useState<any>();
  
    let expiry_date = moment(props?.expiryDate).format("DD/YY");
  
    //Check card validation {Dead/Alive}
    async function checkCardValidation() {
      setLoading(true);
      const [err, res] = await Api.checkCard(
        props?.cardNumber,
        expiry_date,
        props?.cvv
      );
      if (err) {
        console.log(err);
      }
      if (res) {
        if (
          res?.data === `'str' object has no attribute 'decode'` ||
          res?.data === `INVALID RESPONSE❌ Please try again!`
        ) {
          setCardStatus(res?.data);
        } else {
          let resStr = res?.data?.split(" ");
          setCardStatus(resStr[0]);
        }
      }
      setLoading(false);
    }
  
    useEffect(() => {
      const checkCard = async () => {
        await checkCardValidation();
      };
      checkCard();
    }, [props?.cartItems]);
  
    const onClickHandler = async () => {
      await checkCardValidation();
    };
    return (
      <>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {cardStatus === "DECLINED" ? (
              <>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontSize: "medium",
                    color: "red",
                    fontWeight: "bold",
                    // mb: 1,
                  }}
                >
                  {/* <CancelIcon />  */}
                  {cardStatus}
                </Typography>
              </>
            ) : (
              <></>
            )}
            {cardStatus === "LIVE" ? (
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: "medium",
                  color: "green",
                  fontWeight: "bold",
                  // mb: 1,
                }}
              >
                {/* <CheckCircleIcon />  */}
                {cardStatus}
              </Typography>
            ) : (
              <></>
            )}
            {cardStatus === `'str' object has no attribute 'decode'` ||
            cardStatus === `INVALID RESPONSE❌ Please try again!` ? (
              <ColorButton
                variant="contained"
                startIcon={<CachedIcon />}
                onClick={onClickHandler}
              >
                Recheck
              </ColorButton>
            ) : (
              <></>
            )}
          </>
        )}
      </>
    );
  };

export default CheckCard