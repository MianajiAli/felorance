import Link from "next/link";

const page = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-blue-200 ">
      <Link href={"/shop"}>shop</Link>
    </div>
  );
};

export default page;
