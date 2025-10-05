import Link from "next/link";

const page = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-blue-200 gap-3">
      <Link href={"/shop"}>shop</Link>
      <Link href={"/blog"}>blog</Link>
      <Link href={"/login"}>login</Link>
      <Link href={"/register"}>register</Link>
      <Link href={"/about"}>about</Link>
      <Link href={"/contact"}>contact</Link>
    </div>
  );
};

export default page;
