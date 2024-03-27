import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";

import HeaderTitle from "@/components/dashboard/HeaderTitle";
import transactionImg from "../../assets/icons/card-payment.png";
import { Box, Grid } from "@mui/material";

import { Link } from "react-router-dom";
import SingleSchoolTransactionTables from "@/components/Tables/SingleSchoolTransactionTables";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const DashboardSingleTransactionPage = () => {
  const [isUpdate, setIsUpdate] = useState(false);

  return (
    <Box>
      <HeaderTitle
        img={transactionImg}
        title=" Adventist Group of Schools"
        subtitle="Showing all transactions of this school"
      />
      <Box role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            to="/dashboard/transactions"
            className="hover:underline"
            style={{ fontSize: "14px" }}>
            All Transactions
          </Link>

          <Link
            className="hover:underline"
            aria-current="page"
            style={{ fontSize: "14px" }}>
            Adventist Group of Schools Transactions
          </Link>
        </Breadcrumbs>
      </Box>

      <Box className="overflow-x-scroll  bg-white mt-5">
        <SingleSchoolTransactionTables />
      </Box>
    </Box>
  );
};

export default DashboardSingleTransactionPage;
