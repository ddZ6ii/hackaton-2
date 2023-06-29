import React, { useState, useEffect } from "react";
import { Table, ConfigProvider } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import axios from "axios";

export default function Tables() {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  interface DataType {
    brand: string;
    model: string;
    category: string;
    price: number;
    thumbnail_1: string;
    thumbnail_2: string;
    thumbnail_3: string;
    creation_date: string;
    center_id: number;
  }

  interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: string;
    sortOrder?: string;
    filters?: Record<string, FilterValue>;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "",
      dataIndex: "photo",
      key: "photo",
    },
    {
      title: "Marque",
      dataIndex: "brand",
      key: "brand",
      filters: [
        { text: "Apple", value: "Apple" },
        { text: "Samsung", value: "Samsung" },
      ],
    },
    {
      title: "Modèle",
      dataIndex: "model",
      key: "model",
      filters: [
        { text: "iPhone11", value: "iPhone11" },
        { text: "Galaxy S10", value: "Galaxy S10" },
      ],
    },
    {
      title: "Catégorie",
      dataIndex: "category",
      key: "category",
      filters: [
        { text: "3-B", value: "3-B" },
        { text: "5-Premium", value: "5-Premium" },
      ],
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
      render: (creation_date) => {
        const date = new Date(creation_date);
        return date.toLocaleDateString();
      },
    },
    {
      title: "",
      dataIndex: "voir",
      key: "voir",
    },
  ];

  const getApiParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });

  const fetchData = () => {
    setLoading(true);
    const apiUrl = `http://localhost:5000/smartphones?${getApiParams(
      tableParams
    )}`;
    axios
      .get(apiUrl)
      .then((res) => {
        setData(res.data);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: res.data.totalCount,
          },
        });
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<DataType>
  ) => {
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
        />
      </ConfigProvider>
    </div>
  );
}
