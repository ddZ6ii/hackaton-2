import React from "react";
import { Table, ConfigProvider } from "antd";

export default function Tables() {
  const columns = [
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

  const dataSource = [
    {
      key: "1",
      photo: "Iphone picture",
      marque: "Iphone",
      modele: "Iphone 10",
      categorie: "3-B",
      prix: 142,
      ajout: "28/06/23",
      voir: "",
    },
    {
      key: "2",
      photo: "Samsung picture",
      marque: "Samsung",
      modele: "Galaxy s22",
      categorie: "2-C",
      prix: 242,
      ajout: "28/06/23",
      voir: "",
    },
  ];

  return (
    <div className="rounded-lg shadow">
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
          pagination={{
            position: ["bottomCenter"],
          }}
          columns={columns}
          dataSource={dataSource}
        />
      </ConfigProvider>
    </div>
  );
}
