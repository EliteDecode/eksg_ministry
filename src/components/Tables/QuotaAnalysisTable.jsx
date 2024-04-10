import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Typography } from "antd";
import Highlighter from "react-highlight-words";
import { admins, schoolsTableData } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { EditAdmin } from "../Forms/EditAdmin";

const QuotaAnalysisTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const { isLoading, quotaAnalysis } = useSelector(
    (state) => state.Adminstudents
  );

  let results = [];

  quotaAnalysis?.results?.map((item, index) => {
    const data = {
      lg_name: item.lg_name,
      index: index + 1,
      lg_quota: item.lg_quota,
      students_registered: item.students_registered,
    };
    results.push(data);
  });

  results = results.filter((item) => item.lg_name !== "ADO IV");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="success"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}>
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}>
            Reset
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}>
            Filter
          </Button> */}
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}>
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "S/N",
      dataIndex: "index",
      key: "index",
      width: "100px",
    },
    {
      title: "Lga",
      dataIndex: "lg_name",
      key: "lg_name",
      ...getColumnSearchProps("lg_name"),
      sorter: (a, b) => a.lg_name.length - b.lg_name.length,
    },
    {
      title: "Quota",
      key: "lg_quota",
      dataIndex: "lg_quota",
    },
    {
      title: "Registered Students",
      key: "students_registered",
      dataIndex: "students_registered",
    },
  ];
  return <Table columns={columns} dataSource={results} pagination={false} />;
};
export default QuotaAnalysisTable;
