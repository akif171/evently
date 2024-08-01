import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="wrapper flex flex-center flex-between flex-col text-center gap-4 p-5 sm:flex-row">
        <Link href={"/"}>
          <Image
            src={"/assets/images/logo.svg"}
            alt="logo"
            width={128}
            height={38}
          />
        </Link>

        <p>2024 Evently. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
