import Tables from "../components/catalogue/Tables";
import Dropdown from "../components/utilities/Dropdown";

export default function Catalogue() {
  const phone = [
    {
      id: 1,
      name: "Iphone",
    },
    {
      id: 2,
      name: "Samsung",
    },
    {
      id: 3,
      name: "Huawei",
    },
    {
      id: 4,
      name: "Oppo",
    },
  ];

  return (
    <section>
      <h2>Catalogue</h2>
      <div className="flex flex-wrap gap-4">
        <Dropdown title="Filtrer par marque" items={phone} />
        <Dropdown title="Filtrer par modèle" items={phone} />
        <Dropdown title="Filtrer par catégorie" items={phone} />
      </div>
      <Tables />
    </section>
  );
}
