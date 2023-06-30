import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import { Table, ConfigProvider } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import { EyeOutlined } from "@ant-design/icons";

export default function Tables() {
  /**
   * States
   */
  const [data, setData] = useState<DataType[]>([]);
  const [newData, setNewData] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentFilters, setCurrentFilters] = useState("");
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  const [isMobile, setIsMobile] = useState(false);

  /**
   * Constants
   */
  const API = `${import.meta.env.VITE_BACKEND_URL}/smartphones`;

  /**
   * TypeScript
   */
  interface DataType {
    id_phone: number;
    brand: string;
    model: string;
    category: string;
    price: number;
    creation_date: string;
  }

  interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, (FilterValue | null)[] | null>;
  }

  /**
   * Functions (TO BE PLACED WITHIN A DEDICATED HELPER FOLDER)
   */
  const removeDuplicates = (arr: any[], key: string) => {
    return [...new Set(arr.map((obj: any) => obj[key]))].map((param) => ({
      text: param,
      value: param,
    }));
  };

  const getApiParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });

  const formatQuery = ({ brand, model, category }) => {
    let query = "";
    if (brand?.length || model?.length || category?.length) query += "?";
    if (brand?.length) {
      query += "marque=" + brand.join("&marque=");
    }
    if (model?.length) {
      if (brand?.length) query += "&";
      query += "modele=" + model.join("&modele=");
    }
    if (category?.length) {
      if (brand?.length || model?.length) query += "&";
      query += "categorie=" + category.join("&categorie=");
    }
    return query;
  };

  //export to CSV
  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + convertToCSV(data);
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "smartphonedata.csv");
    document.body.appendChild(link);
    link.click();
  };

  const convertToCSV = (data) => {
    const header = Object.keys(data[0]).join(",");
    const rows = data.map((item) => Object.values(item).join(","));
    return [header, ...rows].join("\n");
  };

  //import csv
  const importCSV = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsText(file);
  };

  const handleFileLoad = (event) => {
    const csvData = event.target.result;
    const parsedData = parseCSV(csvData);
    setNewData(parsedData);
  };

  const parseCSV = (csvData) => {
    const rows = csvData.split("\n");
    const headers = rows[0].split(",");
    const parsedData = [];
    for (let i = 1; i < rows.length; i++) {
      const values = rows[i].split(",");
      if (values.length === headers.length) {
        const item = {};
        for (let j = 0; j < headers.length; j++) {
          item[headers[j]] = values[j];
        }
        parsedData.push(item);
      }
    }
    return parsedData;
  };

  const fetchData = (url) => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: res.data.totalCount,
            // total: 100,
          },
        });
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Marque",
      dataIndex: "brand",
      key: "brand",
      filters: removeDuplicates(data, "brand"),
    },
    {
      title: "Modèle",
      dataIndex: "model",
      key: "model",
      filters: removeDuplicates(data, "model"),
    },
    {
      title: "Catégorie",
      dataIndex: "category",
      key: "category",
      filters: removeDuplicates(data, "category"),
    },
    {
      title: "Prix",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => <>{price} €</>,
    },
    {
      title: "Ajouté le",
      dataIndex: "creation_date",
      key: "creation_date",
      sorter: (a, b) => {
        const dateA = new Date(a.creation_date);
        const dateB = new Date(b.creation_date);
        return dateA.getTime() - dateB.getTime();
      },
      render: (creation_date) => {
        const date = new Date(creation_date);
        return date.toLocaleDateString();
      },
    },
    {
      title: "",
      dataIndex: "voir",
      key: "voir",
      render: (_, record) => (
        <NavLink to={`/phones/${record.id_phone}`}>
          <EyeOutlined />
        </NavLink>
      ),
    },
  ];

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, (FilterValue | null)[] | null>,
    sorter: SorterResult<DataType>
  ) => {
    // fetch db on table filter change
    let query = formatQuery(filters);
    if (query !== currentFilters) {
      fetchData(`${API}${query}`);
      setCurrentFilters(query);
    }
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  /**
   * useEffect
   */
  useEffect(() => {
    fetchData(`${API}`);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSendCsv = () => {
    const formatedCsv = {
      brand: newData[0].brand,
      creation_date:
        new Date().getFullYear() +
        "-" +
        ("0" + (new Date().getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + new Date().getDate()).slice(-2),
      model: newData[0].model,
      thumbnail_1: "",
      thumbnail_2: "",
      thumbnail_3: "",
      category: newData[0].category,
      color: "",
      has_charger: +newData[0].has_charger === 1 ? true : false,
      network: newData[0].network,
      OS: "",
      price: +newData[0].price,
      RAM: +newData[0].RAM,
      screen: +newData[0].screen,
      state: newData[0].state,
      storage: +newData[0].storage,
    };
    axios
      .post("http://localhost:5000/smartphones", formatedCsv)
      .then((res) => fetchData(`${API}`))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="rounded-lg shadow-md">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#00ACB0",
              colorTextHeading: "#002743",
              colorText: "#00ACB0",
              colorBorderSecondary: "#EBEBEB",
              colorFillSecondary: "#EBEBEB",
              fontSize: 16,
            },
          }}
        >
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              position: ["bottomCenter"],
              ...tableParams.pagination,
            }}
            loading={loading}
            onChange={handleTableChange}
            rowKey={(record) => record.id_phone}
            tableLayout={isMobile ? "auto" : "fixed"}
          />
        </ConfigProvider>
      </div>
      <button
        type="button"
        className="connect-ghostButton"
        onClick={exportToCSV}
      >
        Exporter le tableau en CSV
      </button>
      <input type="file" accept=".csv" onChange={importCSV} />
      <button
        type="button"
        onClick={handleSendCsv}
        className="connect-ghostButton"
      >
        Envoyer dans la BDD
      </button>
    </>
  );
}
