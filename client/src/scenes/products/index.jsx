import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";
import TextField from '@mui/material/TextField';

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  
  
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h3" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem", fontSize: 25 }} color={theme.palette.secondary[400]}>
          MAC: {price}
        </Typography>
        {/* <Rating value={rating} readOnly />*/}

        <Typography variant="body2">{description}</Typography> 
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => {}}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const URL = "http://222.252.17.89:5000/api/greenhouses"
  async function logJSONData() {
    const response = await fetch(URL);
    const jsonData = await response.json();
    console.log(jsonData["body"]["results"]);
    setGateways(jsonData["body"]["results"]);
    return jsonData;
  }
  const [gateways, setGateways] = useState([]);
  const [query, setQuery] = useState("");
  const onClick = () => {
    logJSONData()
  }
  useEffect(() => {
    logJSONData();
  }, [])
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      <TextField 
        id="outlined-basic" 
        label="Mac tủ gateway" 
        variant="outlined" 
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value.toLowerCase())} 
      />  
      

      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {gateways
          .filter((asd) =>
           asd.mac.toLowerCase().includes(query))
           .map(
            ({
              _id,
              name,
              updatedAt,
              mac,
              mode,
              createdAt,
              farmId,
              id,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={updatedAt.toLocaleString("en-US")}
                price={mac}
                rating={mode}
                category={createdAt}
                supply={farmId}
                stat={id}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;
