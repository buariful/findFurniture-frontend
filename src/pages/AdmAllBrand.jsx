import React from "react";
import {
  useCreateBrandMutation,
  useDeleteBrandMutation,
  useGetAllBrandsQuery,
} from "../features/brand/brandApi";
import {
  Button,
  Card,
  IconButton,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { LoaderFullScreen } from "../utils/Loader";
import { AlertError } from "../utils/Alert";
import { ToastError, ToastSuccess } from "../utils/Toast";

const AdmAllBrand = () => {
  const { isLoading, data, refetch } = useGetAllBrandsQuery();
  const [createBrand, { isLoading: brnLoad, error: brndError }] =
    useCreateBrandMutation();
  const [deleteBrand, { isLoading: brnDtlLoad, error: brnDltError }] =
    useDeleteBrandMutation();

  const brandCreate = (e) => {
    e.preventDefault();
    createBrand({ name: e.target.name.value, estabished: e.target.date.value })
      .unwrap()
      .then((res) => {
        ToastSuccess(res?.message);
        refetch();
        e.target.reset();
      })
      .catch((err) => ToastError(err?.data?.message));
  };
  const brandDelete = (id, name) => {
    const brnData = { id: id, name: name };
    deleteBrand(brnData)
      .unwrap()
      .then(() => {
        ToastSuccess("Brand deleted");
        refetch();
      })
      .catch(() => ToastError("Brand cannot be deleted"));
  };

  const brands = data?.data?.map((d) => (
    <tr className="bg-white border-b capitalize" key={d?._id}>
      <td className="px-2 py-1">
        <span className="font-semibold">{d?.name}</span>
      </td>
      <td className="px-2 py-1">{d?.estabished}</td>

      <td className="px-2 py-1 text-gray-900 whitespace-nowrap lowercase">
        <IconButton
          variant="text"
          color="red"
          onClick={() => brandDelete(d?._id, d?.name)}
        >
          <TrashIcon className="w-5" />
        </IconButton>
      </td>
    </tr>
  ));
  return (
    <div>
      {brndError && <AlertError text={brndError?.data?.message} />}
      <div className="my-5">
        <div className="relative overflow-x-auto w-10/12 mx-auto">
          <table className="w-full text-sm  border">
            <thead className="text-xs bg-gray-50 ">
              <tr className="capitalize">
                <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
                  Name
                </th>
                <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
                  Established
                </th>
                <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>{brands}</tbody>
          </table>
        </div>
      </div>

      {/* ----- brand create errors ----- */}
      {brnDltError && <AlertError text={brnDltError?.data?.message} />}

      <div className="w-11/12 max-w-lg mx-auto mt-5 mb-16">
        <Card className="shadow-lg p-10 bg-gray-100">
          <Typography variant="h4" color="blue-gray">
            Add a brand
          </Typography>
          <form className="mt-8 mb-2 " onSubmit={brandCreate}>
            <div className="mb-4 flex flex-col gap-6">
              <Input size="lg" label="name" name="name" required />
              <Input size="lg" label="date" name="date" required type="date" />
            </div>

            <Button
              type="submit"
              className="mt-6 grid place-items-center"
              fullWidth
            >
              {brnLoad ? <Spinner className="w-5" /> : "Create"}
            </Button>
          </form>
        </Card>
      </div>
      {(isLoading || brnLoad || brnDtlLoad) && <LoaderFullScreen />}
    </div>
  );
};

export default AdmAllBrand;
