import Image from "next/image";

const Logo = () => {
  return (
    <Image
      width={132}
      height={132}
      src="/logo.svg "
      alt="Logo for Learn with Simon"
    />
  );
};

export default Logo;
