import { useEffect, useState } from "react";

export default function Footer() {
  const [currentYear, setcurrentYear] = useState(null);
  useEffect(() => {
    setcurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="flex flex-col items-center justify-center gap-3 bg-primary px-6 py-3 text-neutralLight md:h-10 md:flex-row md:justify-between md:px-12 md:py-4">
      <p className="text-xs md:text-sm">
        &copy; {currentYear} Emmaus Connect. Tous droits réservés
      </p>
      <div className="flex items-center gap-4">
        <a href="https://www.instagram.com/">
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6"
          >
            <path
              d="M15 0C10.9294 0 10.4175 0.01875 8.81812 0.09C7.21875 0.165 6.12937 0.41625 5.175 0.7875C4.17393 1.16404 3.26717 1.75467 2.51813 2.51813C1.75514 3.26756 1.16458 4.1742 0.7875 5.175C0.41625 6.1275 0.163125 7.21875 0.09 8.8125C0.01875 10.4156 0 10.9256 0 15.0019C0 19.0744 0.01875 19.5844 0.09 21.1838C0.165 22.7812 0.41625 23.8706 0.7875 24.825C1.17188 25.8112 1.68375 26.6475 2.51813 27.4819C3.35063 28.3162 4.18687 28.83 5.17313 29.2125C6.12937 29.5837 7.21688 29.8369 8.81437 29.91C10.4156 29.9812 10.9256 30 15 30C19.0744 30 19.5825 29.9812 21.1838 29.91C22.7794 29.835 23.8725 29.5837 24.8269 29.2125C25.8273 28.8358 26.7334 28.2451 27.4819 27.4819C28.3162 26.6475 28.8281 25.8112 29.2125 24.825C29.5819 23.8706 29.835 22.7812 29.91 21.1838C29.9812 19.5844 30 19.0744 30 15C30 10.9256 29.9812 10.4156 29.91 8.81437C29.835 7.21875 29.5819 6.1275 29.2125 5.175C28.8355 4.17417 28.2449 3.26752 27.4819 2.51813C26.7331 1.75439 25.8262 1.16371 24.825 0.7875C23.8687 0.41625 22.7775 0.163125 21.1819 0.09C19.5806 0.01875 19.0725 0 14.9963 0H15.0019H15ZM13.6556 2.70375H15.0019C19.0069 2.70375 19.4812 2.71688 21.0619 2.79C22.5244 2.85563 23.3194 3.10125 23.8481 3.30562C24.5475 3.5775 25.0481 3.90375 25.5731 4.42875C26.0981 4.95375 26.4225 5.4525 26.6944 6.15375C26.9006 6.68062 27.1444 7.47563 27.21 8.93813C27.2831 10.5188 27.2981 10.9931 27.2981 14.9963C27.2981 18.9994 27.2831 19.4756 27.21 21.0562C27.1444 22.5187 26.8988 23.3119 26.6944 23.8406C26.4539 24.4919 26.07 25.0808 25.5712 25.5637C25.0462 26.0887 24.5475 26.4131 23.8463 26.685C23.3213 26.8913 22.5262 27.135 21.0619 27.2025C19.4812 27.2738 19.0069 27.2906 15.0019 27.2906C10.9969 27.2906 10.5206 27.2738 8.94 27.2025C7.4775 27.135 6.68437 26.8913 6.15562 26.685C5.50406 26.4449 4.91461 26.0617 4.43062 25.5637C3.93141 25.0801 3.54698 24.4906 3.30562 23.8387C3.10125 23.3119 2.85563 22.5169 2.79 21.0544C2.71875 19.4738 2.70375 18.9994 2.70375 14.9925C2.70375 10.9875 2.71875 10.515 2.79 8.93437C2.8575 7.47187 3.10125 6.67688 3.3075 6.14813C3.57938 5.44875 3.90562 4.94812 4.43062 4.42312C4.95563 3.89812 5.45437 3.57375 6.15562 3.30188C6.68437 3.09563 7.4775 2.85188 8.94 2.78437C10.3238 2.72062 10.86 2.70188 13.6556 2.7V2.70375ZM23.0081 5.19375C22.7717 5.19375 22.5377 5.24031 22.3193 5.33077C22.1009 5.42123 21.9025 5.55381 21.7353 5.72096C21.5682 5.8881 21.4356 6.08653 21.3451 6.30492C21.2547 6.52331 21.2081 6.75737 21.2081 6.99375C21.2081 7.23013 21.2547 7.46419 21.3451 7.68258C21.4356 7.90097 21.5682 8.0994 21.7353 8.26654C21.9025 8.43369 22.1009 8.56627 22.3193 8.65673C22.5377 8.74719 22.7717 8.79375 23.0081 8.79375C23.4855 8.79375 23.9434 8.60411 24.2809 8.26654C24.6185 7.92898 24.8081 7.47114 24.8081 6.99375C24.8081 6.51636 24.6185 6.05852 24.2809 5.72096C23.9434 5.38339 23.4855 5.19375 23.0081 5.19375ZM15.0019 7.2975C13.9801 7.28156 12.9654 7.46904 12.0168 7.84901C11.0682 8.22899 10.2047 8.79388 9.47653 9.51079C8.74835 10.2277 8.17006 11.0823 7.77533 12.0249C7.3806 12.9674 7.17731 13.9791 7.17731 15.0009C7.17731 16.0228 7.3806 17.0345 7.77533 17.977C8.17006 18.9196 8.74835 19.7742 9.47653 20.4911C10.2047 21.208 11.0682 21.7729 12.0168 22.1529C12.9654 22.5328 13.9801 22.7203 15.0019 22.7044C17.0241 22.6728 18.9529 21.8473 20.3718 20.4061C21.7908 18.9649 22.5861 17.0234 22.5861 15.0009C22.5861 12.9784 21.7908 11.037 20.3718 9.59578C18.9529 8.15454 17.0241 7.32905 15.0019 7.2975ZM15.0019 9.99938C16.3281 9.99938 17.6001 10.5262 18.5379 11.464C19.4757 12.4018 20.0025 13.6738 20.0025 15C20.0025 16.3262 19.4757 17.5982 18.5379 18.536C17.6001 19.4738 16.3281 20.0006 15.0019 20.0006C13.6756 20.0006 12.4037 19.4738 11.4659 18.536C10.5281 17.5982 10.0013 16.3262 10.0013 15C10.0013 13.6738 10.5281 12.4018 11.4659 11.464C12.4037 10.5262 13.6756 9.99938 15.0019 9.99938Z"
              className="fill-neutralLight"
            />
          </svg>
        </a>
        <a href="https://twitter.com/">
          <svg
            width="30"
            height="26"
            viewBox="0 0 30 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6"
          >
            <path
              d="M9.42375 25.1882C20.745 25.1882 26.9381 15.8076 26.9381 7.68694C26.9381 7.42444 26.9381 7.15819 26.9269 6.89569C28.1326 6.02285 29.1732 4.94222 30 3.70444C28.8737 4.20103 27.6802 4.52832 26.4581 4.67569C27.7454 3.90626 28.7095 2.69563 29.1712 1.26881C27.9619 1.9853 26.6382 2.48826 25.2581 2.75569C24.3303 1.76761 23.1026 1.11303 21.7652 0.89336C20.4277 0.673684 19.0551 0.901167 17.86 1.54057C16.6649 2.17998 15.714 3.19562 15.1546 4.43018C14.5952 5.66474 14.4585 7.04931 14.7656 8.36944C12.3183 8.24672 9.92403 7.61094 7.7382 6.50333C5.55238 5.39572 3.62378 3.84102 2.0775 1.94006C1.29251 3.29584 1.05295 4.89957 1.40746 6.42556C1.76197 7.95156 2.68398 9.28543 3.98625 10.1563C3.01039 10.1232 2.05598 9.86111 1.2 9.39131V9.47569C1.20168 10.896 1.6937 12.2721 2.59289 13.3715C3.49208 14.4709 4.74328 15.2261 6.135 15.5094C5.60674 15.655 5.06106 15.7275 4.51312 15.7251C4.12684 15.7262 3.74134 15.6904 3.36188 15.6182C3.75522 16.8408 4.52114 17.9097 5.55234 18.6753C6.58354 19.4409 7.82838 19.8648 9.1125 19.8876C6.93104 21.6009 4.23638 22.5302 1.4625 22.5257C0.973726 22.5278 0.485293 22.4996 0 22.4413C2.81534 24.2362 6.08493 25.1892 9.42375 25.1882Z"
              fill="#D9D9D9"
              className="fill-neutralLight"
            />
          </svg>
        </a>
        <a href="https://www.facebook.com/">
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6"
          >
            <path
              d="M30 15.0919C30 6.75666 23.2846 0 15.0019 0C6.71541 0.00187477 0 6.75666 0 15.0937C0 22.6247 5.48556 28.8676 12.6547 30V19.4544H8.84889V15.0937H12.6584V11.766C12.6584 7.98463 14.8988 5.89614 18.324 5.89614C19.9663 5.89614 21.6817 6.19048 21.6817 6.19048V9.90251H19.79C17.9284 9.90251 17.3472 11.0667 17.3472 12.261V15.0919H21.5054L20.8418 19.4526H17.3453V29.9981C24.5144 28.8658 30 22.6228 30 15.0919Z"
              className="fill-neutralLight"
            />
          </svg>
        </a>
      </div>
    </footer>
  );
}
