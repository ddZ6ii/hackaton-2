import SignForm from "../components/SignForm";

export default function Account() {
  return (
    <section className="flex items-center justify-center">
      <SignForm />
      <img
        className="absolute bottom-0 right-0 -z-10 w-[500px]"
        src="../assets/icons/logo.svg"
      ></img>
    </section>
  );
}
