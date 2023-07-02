import { Alert } from "@material-tailwind/react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

export const AlertError = ({ text }) => {
  return (
    <Alert
      icon={<ExclamationCircleIcon className=" h-6 w-6" />}
      className="bg-red-50 text-red-500 border-l-4 border-red-500 rounded-none font-medium my-6 capitalize w-11/12 max-w-2xl mx-auto"
    >
      <p className="max-w-full break-all">{text}</p>
    </Alert>
  );
};
export const AlertSuccess = ({ text }) => {
  return (
    <Alert
      icon={<CheckCircleIcon className="my-6px h-6 w-6" />}
      className="bg-[#2ec946]/10 text-[#2ec946] border-l-4 border-[#2ec946] rounded-none font-medium my-6 capitalize w-11/12 max-w-2xl mx-auto"
    >
      <p className="max-w-full break-all">{text}</p>
    </Alert>
  );
};
