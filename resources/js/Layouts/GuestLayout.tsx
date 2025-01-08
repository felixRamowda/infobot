import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
 return (
  <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 ">
   <div className="flex items-center gap-x-5">
    <h1 className="font-poppins font-light italic lg:text-3xl text-[33px]">INFOBOT</h1>
    <Link href="/Articles" className="animate-jump-in animate-duration-600">
     <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
    </Link>
   </div>

   <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">{children}</div>
  </div>
 );
}
