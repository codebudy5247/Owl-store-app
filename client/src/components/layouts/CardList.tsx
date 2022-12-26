import React, { useState, useEffect } from "react";
import { Box, Card, Container, Typography } from "@mui/material";
import TableComp from "../Table";
import * as Api from "../../services/api";
const CardList = () => {
  const [cardList, setCardList] = useState<any>([]);

  console.log("cardList",cardList);
  
  useEffect(() => {
    const init = async () => {
      const [err, res] = await Api.getCards();
      if (res) {
        setCardList(res.data);
      }
    };
    init();
  }, []);

  return (
    <Container sx={{ mt: 5, mb: 5 }}>
      <Card sx={{ borderRadius: 5, p: 3 }}>
        {cardList?.length === 0 || cardList === undefined ? (
          <Typography
            variant="h4"
            sx={{ textAlign: "center", color: "#EE2B70", fontWeight: 600 }}
          >
            No Cards Found!
          </Typography>
        ) : (
          <>
            <TableComp cardList={cardList} />
          </>
        )}
      </Card>
    </Container>
  );
};

export default CardList;
