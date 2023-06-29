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
  const [loading, setLoading] = useState(false);
  const [currentFilters, setCurrentFilters] = useState("");
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

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

  return (
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
        />
      </ConfigProvider>
    </div>
  );
}
