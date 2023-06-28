import React, { useState, useEffect } from "react";
import { Table, ConfigProvider } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { SorterResult } from "antd/es/table/interface";
import qs from "qs";

export default function Tables() {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  interface DataType {
    marque: string;
    modele: string;
    categorie: string;
    prix: number;
  }

  interface TableParams {
    pagination?: TablePaginationConfig;
    sortOrder?: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "",
      dataIndex: "photo",
      key: "photo",
    },
    {
      title: "Marque",
      dataIndex: "marque",
      key: "marque",
    },
    {
      title: "Modèle",
      dataIndex: "modele",
      key: "modele",
    },
    {
      title: "Catégorie",
      dataIndex: "categorie",
      key: "categorie",
    },
    {
      title: "Prix",
      dataIndex: "prix",
      key: "prix",
      sorter: (a, b) => a.prix - b.prix,
    },
    {
      title: "Ajouté le",
      dataIndex: "ajout",
      key: "ajout",
    },
    {
      title: "",
      dataIndex: "voir",
      key: "voir",
    },
  ];

  const getRandomuserParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });

  const fetchData = () => {
    setLoading(true);
    fetch(
      `https://randomuser.me/api?${qs.stringify(
        getRandomuserParams(tableParams)
      )}`
    )
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 100,
            // total you should be based from database
            // total: data.totalCount,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    sorter: SorterResult<DataType>
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00ACB0",
          colorTextHeading: "#002743",
          colorText: "#00ACB0",
          colorBorderSecondary: "#EBEBEB",
          fontSize: 16,
        },
      }}
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </ConfigProvider>
  );
}

//   const columns = [
//     {
//       title: "",
//       dataIndex: "photo",
//       key: "photo",
//     },
//     {
//       title: "Marque",
//       dataIndex: "marque",
//       key: "marque",
//       onFilter: (value, record) => record.marque.indexOf(value as string) === 0,
//     },
//     {
//       title: "Modèle",
//       dataIndex: "modele",
//       key: "modele",
//       onFilter: (value, record) => record.modele.indexOf(value as string) === 0,
//     },
//     {
//       title: "Catégorie",
//       dataIndex: "categorie",
//       key: "categorie",
//       onFilter: (value, record) =>
//         record.categorie.indexOf(value as string) === 0,
//     },
//     {
//       title: "Prix",
//       dataIndex: "prix",
//       key: "prix",
//       sorter: (a, b) => a.prix - b.prix,
//     },
//     {
//       title: "Ajouté le",
//       dataIndex: "ajout",
//       key: "ajout",
//     },
//     {
//       title: "",
//       dataIndex: "voir",
//       key: "voir",
//     },
//   ];

//   const dataSource = [
//     {
//       key: "1",
//       photo: "Iphone picture",
//       marque: "Iphone",
//       modele: "Iphone 10",
//       categorie: "3-B",
//       prix: 142,
//       ajout: "28/06/23",
//       voir: "",
//     },
//     {
//       key: "2",
//       photo: "Samsung picture",
//       marque: "Samsung",
//       modele: "Galaxy s22",
//       categorie: "2-C",
//       prix: 242,
//       ajout: "28/06/23",
//       voir: "",
//     },
//   ];

//   return (
//     <div className="rounded-lg shadow">
//       <ConfigProvider
//         theme={{
//           token: {
//             colorPrimary: "#00ACB0",
//             colorTextHeading: "#002743",
//             colorText: "#00ACB0",
//             colorBorderSecondary: "#EBEBEB",
//             fontSize: 16,
//           },
//         }}
//       >
//         <Table
//           pagination={{
//             position: ["bottomCenter"],
//           }}
//           columns={columns}
//           dataSource={dataSource}
//           tableLayout={"fixed"}
//         />
//       </ConfigProvider>
//     </div>
//   );
// }
