import HeaderTitle from "@/components/dashboard/HeaderTitle";
import React from "react";
import transactionImg from "../../assets/icons/card-payment.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Box } from "@mui/material";
import { transactions } from "@/lib/generateContent";
import TransactionTables from "@/components/Tables/TransactionTables";

const DashboardTransactionPage = () => {
  console.log(transactions);
  return (
    <div>
      {" "}
      <HeaderTitle
        img={transactionImg}
        title="Transactions"
        subtitle="Showing all transactions of schools"
      />
      <Box>
        <Tabs defaultValue="all" className=" w-[100%]">
          <TabsList className="grid w-full grid-cols-4 gap-2">
            <TabsTrigger value="all">All </TabsTrigger>
            <TabsTrigger value="successful">Successful</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Box className="overflow-x-scroll  bg-white">
              <TransactionTables category="all" />
            </Box>
          </TabsContent>
          <TabsContent value="successful">
            <Box className="overflow-x-scroll  bg-white">
              <TransactionTables category="Successful" />
            </Box>
          </TabsContent>
          <TabsContent value="pending">
            <Box className="overflow-x-scroll  bg-white">
              <TransactionTables category="Pending" />
            </Box>
          </TabsContent>
          <TabsContent value="failed">
            <Box className="overflow-x-scroll  bg-white">
              <TransactionTables category="Failed" />
            </Box>
          </TabsContent>
        </Tabs>
      </Box>
    </div>
  );
};

export default DashboardTransactionPage;
