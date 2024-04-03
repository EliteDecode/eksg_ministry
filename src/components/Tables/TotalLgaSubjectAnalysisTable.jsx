import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag, Typography } from "antd";
import Highlighter from "react-highlight-words";
import { admins, schoolsTableData } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { EditAdmin } from "../Forms/EditAdmin";

const TotalLgaSubjectAnalysisTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const { isLoading, totalLgaSubjectAnalysis } = useSelector(
    (state) => state.Adminstudents
  );

  const transformedAnalysis = totalLgaSubjectAnalysis?.map((item) => {
    const subjects = item.subjects.reduce((acc, subject) => {
      acc[subject.name.toLowerCase().replace(/\s+/g, "_")] =
        subject.student_count;
      return acc;
    }, {});

    return {
      id: item.id,
      Lga: item.lg_name,
      ...subjects,
    };
  });

  const { users } = useSelector((state) => state.adminAuth);

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
      title: "Lga",
      dataIndex: "Lga",
      key: "Lga",
      ...getColumnSearchProps("Lga"),
      sorter: (a, b) => a.Lga.length - b.Lga.length,
    },
    {
      title: "English",
      key: "english_language",
      dataIndex: "english_language",
    },
    {
      title: "Maths",
      key: "mathematics",
      dataIndex: "mathematics",
    },
    {
      title: "Business Studies",
      key: "business_studies",
      dataIndex: "business_studies",
    },
    {
      title: "Basic technology",
      key: "basic_science_&_technology",
      dataIndex: "basic_science_&_technology",
    },
    {
      title: "Pre-vocational Studies",
      key: "pre-vocational_studies",
      dataIndex: "pre-vocational_studies",
    },
    {
      title: "National Value",
      key: "national_value",
      dataIndex: "national_value",
    },
    {
      title: "Yoruba",
      key: "yoruba",
      dataIndex: "yoruba",
    },
    {
      title: "CCA",
      key: "cca",
      dataIndex: "cca",
    },
    {
      title: "CRS",
      key: "crs",
      dataIndex: "crs",
    },
    {
      title: "IRS",
      key: "irs",
      dataIndex: "irs",
    },
    {
      title: "French",
      key: "french",
      dataIndex: "french",
    },
    {
      title: "Arabic",
      key: "arabic",
      dataIndex: "arabic",
    },
    {
      title: "History",
      key: "history",
      dataIndex: "history",
    },
    {
      title: "Action",
      fixed: "right",
      render: (_, record) => (
        <Link to={`/dashboard/singleLga-analysis/${record.id}`}>
          <Button className="bg-blue-800 text-white text-[11px]">
            {" "}
            View LGA{" "}
          </Button>
        </Link>
      ),
    },
  ];
  return <Table columns={columns} dataSource={transformedAnalysis} />;
};
export default TotalLgaSubjectAnalysisTable;
