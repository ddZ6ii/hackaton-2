import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Radio, Select, Upload } from "antd";
import type { SelectProps } from "antd";
import { toast } from "react-toastify";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";

export default function PhoneForm() {
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [form] = Form.useForm();

  const brandOptions: SelectProps["options"] = [
    "Apple",
    "Samsung",
    "Huawei",
    "Oppo",
    "Nokia",
    "Motorola",
  ].map((brand) => ({ value: brand, label: brand }));

  const storageOptions: SelectProps["options"] = [
    { value: "8Go", valS: 0 },
    { value: "16Go", valS: 31 },
    { value: "32Go", valS: 65 },
    { value: "64Go", valS: 86 },
    { value: "128Go", valS: 175 },
    { value: "256Go", valS: 219 },
    { value: "512Go", valS: 281 },
    { value: "1024Go", valS: 340 },
  ].map((option) => ({
    value: option.value,
    label: option.value,
    valS: option.valS,
  }));

  const memoryOptions: SelectProps["options"] = [
    { value: "1Go", valM: 30 },
    { value: "2Go", valM: 40 },
    { value: "3Go", valM: 54 },
    { value: "4Go", valM: 65 },
    { value: "6Go", valM: 88 },
    { value: "8Go", valM: 109 },
    { value: "12Go", valM: 141 },
    { value: "16Go", valM: 215 },
  ].map((option) => ({
    value: option.value,
    label: option.value,
    valM: option.valM,
  }));

  const networkOptions: SelectProps["options"] = ["2G", "3G", "4G", "5G"].map(
    (network) => ({ value: network, label: network })
  );

  const screenOptions: SelectProps["options"] = [
    "3.5 Pouces",
    "4 Pouces",
    "5 Pouces",
    "6 Pouces",
    "7 Pouces",
    "8 Pouces",
    "9 Pouces",
  ].map((network) => ({ value: network, label: network }));

  const antutuOptions: SelectProps["options"] = [
    { value: "0-50 000", valA: 40 },
    { value: "50 000-100 000", valA: 64 },
    { value: "100 000-150 000", valA: 89 },
    { value: "150 000+", valA: 105 },
  ].map((option) => ({
    value: option.value,
    label: option.value,
    valA: option.valA,
  }));

  const conditionOptions: SelectProps["options"] = [
    { value: "DEEE", ponderation: -100 },
    { value: "RÉPARABLE", ponderation: -50 },
    { value: "BLOQUÉ", ponderation: -10 },
    { value: "RECONDITIONABLE", ponderation: -5 },
    { value: "RECONDITIONNÉ", ponderation: 0 },
    { value: "BON ÉTAT", ponderation: 5 },
    { value: "NEUF", ponderation: 10 },
  ].map((option) => ({
    value: option.value,
    label: option.value,
    ponderation: option.ponderation,
  }));

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const calculateCategory = () => {
    // Perform the category calculation & price calculation here based on the form inputs
    const selectedAntutuOption = form.getFieldValue("Antutu");
    const antutuValue =
      antutuOptions.find((option) => option.value === selectedAntutuOption)
        ?.valA || 0;

    const selectedRamOption = form.getFieldValue("RAM");
    const memoryValue =
      memoryOptions.find((option) => option.value === selectedRamOption)
        ?.valM || 0;

    const selectedStorageOption = form.getFieldValue("Stockage");
    const storageValue =
      storageOptions.find((option) => option.value === selectedStorageOption)
        ?.valS || 0;

    const selectedCondition = form.getFieldValue("Etat");
    const ponderationValue =
      conditionOptions.find((option) => option.value === selectedCondition)
        ?.ponderation || 0;

    const totalValue = antutuValue + memoryValue + storageValue;
    const categoryValue = totalValue * (1 + ponderationValue / 100);

    let priceRangeA = 0;
    let priceRangeB = 0;

    if (categoryValue >= 90 && categoryValue <= 165) {
      setCategory("2 - C");
      priceRangeA = 50;
      priceRangeB = 100;
    } else if (categoryValue > 165 && categoryValue <= 255) {
      setCategory("3 - B");
      priceRangeA = 100;
      priceRangeB = 200;
    } else if (categoryValue > 255 && categoryValue <= 375) {
      setCategory("4 - A");
      priceRangeA = 200;
      priceRangeB = 300;
    } else if (categoryValue > 375) {
      setCategory("5 - Premium");
      priceRangeA = 400;
      priceRangeB = 500;
    } else {
      setCategory("1 - HC");
      priceRangeA = 0;
      priceRangeB = 0;
    }

    const randomPrice = Math.floor(
      Math.random() * (priceRangeB - priceRangeA + 1) + priceRangeA
    );
    setPrice(randomPrice);
  };

  // Toastify logic to display a pop up on form submit
  const sendData = async () => {
    try {
      await form.validateFields();
      const values = {
        ...form.getFieldsValue(),
        price: price,
        category: category,
      };
      const formatedValues = {
        brand: values.Marque,
        creation_date:
          new Date().getFullYear() +
          "-" +
          ("0" + (new Date().getMonth() + 1)).slice(-2) +
          "-" +
          ("0" + new Date().getDate()).slice(-2),
        model: values.Modèle,
        thumbnail_1: "",
        thumbnail_2: "",
        thumbnail_3: "",
        category: values.category,
        color: "",
        has_charger: values.Chargeur === "Oui" ? true : false,
        network: values.Réseau,
        OS: "",
        price: values.price,
        RAM: Number(values.RAM.replace("Go", "")),
        screen: Number(values.Ecran.split(" ")[0]),
        state: values.Etat,
        storage: Number(values.Stockage.replace("Go", "")),
      };

      axios
        .post("http://localhost:5000/smartphones", formatedValues)
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err));


      toast.success("Téléphone ajouté !", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });

      form.resetFields();
      setCategory("");
      setPrice(0);
    } catch (error) {
      toast.error("Oops, une erreur est survenue !", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <Form
        layout="horizontal"
        className="w-full items-center justify-center md:flex md:flex-col md:gap-4"
        form={form}
      >
        {/* Brand and Model */}
        <div className="flex w-full gap-4">
          <Form.Item label="Marque" className="w-full" name="Marque" required>
            <Select className="text-start" options={brandOptions}></Select>
          </Form.Item>
          <Form.Item label="Modèle" className="w-full" name="Modèle" required>
            <Input />
          </Form.Item>
        </div>

        {/* Storage and Memory */}
        <div className="flex w-full gap-4">
          <Form.Item
            label="Stockage"
            className="w-full"
            name="Stockage"
            required
          >
            <Select className="text-start" options={storageOptions} />
          </Form.Item>
          <Form.Item label="RAM" className="w-full" name="RAM" required>
            <Select className="text-start" options={memoryOptions} />
          </Form.Item>
        </div>

        {/* Network, Screen Size, Antutu */}
        <div className="flex w-full gap-4">
          <Form.Item label="Réseau" className="w-1/4" name="Réseau">
            <Select className="text-start" options={networkOptions}></Select>
          </Form.Item>
          <Form.Item label="Ecran" className="w-1/4" name="Ecran">
            <Select className="text-start" options={screenOptions}></Select>
          </Form.Item>
          <Form.Item
            label="Indice Antutu"
            className="w-2/4"
            name="Antutu"
            required
          >
            <Select className="text-start" options={antutuOptions}></Select>
          </Form.Item>
        </div>

        {/* Condition and Charger */}
        <div className="flex w-full gap-4">
          <Form.Item label="Etat" className="w-full" name="Etat" required>
            <Select className="text-start" options={conditionOptions}></Select>
          </Form.Item>
          <Form.Item
            label="Chargeur"
            className="w-full"
            name="Chargeur"
            required
          >
            <Radio.Group>
              <Radio value="Oui"> Oui </Radio>
              <Radio value="Non"> Non </Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        {/* Upload of picture */}
        <Form.Item
          label="Photo"
          valuePropName="fileList"
          name="Photo"
          getValueFromEvent={normFile}
        >
          <Upload
            action="/upload.do"
            accept=".jpeg,.jpg,.png,.webp"
            listType="picture-card"
            maxCount={3}
          >
            <div>
              <PlusOutlined />
              <div className="mt-2">Upload</div>
            </div>
          </Upload>
        </Form.Item>

        {/* Submit button */}
        <div className="flex w-full items-center gap-4">
          <div className="w-full">
            <Form.Item label="Catégorie" className="w-full">
              <Input disabled value={category} />
            </Form.Item>
            <Form.Item label="Prix (€)" className="w-full">
              <Input disabled value={price} />
            </Form.Item>
          </div>
          <Form.Item className="w-full">
            <button
              type="button"
              className="rounded border-0 bg-primary px-3 py-1 text-base text-neutralLight hover:bg-primary/75 md:mt-0"
              onClick={calculateCategory}
            >
              Calculer la catégorie
            </button>
          </Form.Item>
        </div>
        <Form.Item>
          <button
            type="submit"
            className="connect-ghostButton"
            onClick={sendData}
          >
            Ajouter au catalogue
          </button>
        </Form.Item>
      </Form>
    </>
  );
}
