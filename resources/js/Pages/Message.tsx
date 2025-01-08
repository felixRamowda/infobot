import Authenticated from "@/Layouts/AuthenticatedLayout";
export default function Message() {
 return (
  <Authenticated header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Message/</h2>}>
   <h1>Message body baby!</h1>
  </Authenticated>
 );
}
