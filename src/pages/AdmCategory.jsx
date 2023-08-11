import React from "react";
import {
  useCreateCategoriesMutation,
  useDelteCategoryMutation,
  useGetAllCategoriesQuery,
} from "../features/category/categoryApi";
import { LoaderFullScreen } from "../utils/Loader";
import {
  Button,
  Card,
  IconButton,
  Input,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ToastError, ToastSuccess } from "../utils/Toast";
import { AlertError } from "../utils/Alert";

const AdmCategory = () => {
  const { data, isLoading, refetch } = useGetAllCategoriesQuery();
  const [createCategories, { isLoading: ctgLoading, error: ctgError }] =
    useCreateCategoriesMutation();
  const [delteCategory, { isLoading: ctgDltLoad, error: ctgDltError }] =
    useDelteCategoryMutation();

  const createCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", e.target.image.files[0]);
    formData.set("name", e.target.name.value);
    createCategories(formData)
      .unwrap()
      .then((res) => {
        refetch();
        ToastSuccess(res?.message);
        e.target.reset();
      })
      .catch((err) => {
        ToastError("Category can not be created");
      });
  };
  const categoryDelete = (id, imgPubId, category) => {
    const data = {
      id: id,
      data: { imgPublicId: imgPubId, category: category },
    };
    delteCategory(data)
      .unwrap()
      .then((res) => {
        ToastSuccess(res?.message);
        refetch();
      })
      .catch((err) => ToastError(err?.data?.message));
  };

  const categories = data?.data?.map((d) => (
    <tr className="bg-white border-b capitalize" key={d?._id}>
      <td className="px-2 py-1">
        <span className="font-semibold">{d?.name}</span>
      </td>
      <td className="px-2 py-1 text-gray-900 whitespace-nowrap">
        <img
          src={d?.picture[0]?.url}
          alt={d?.name}
          className="w-[50px] mx-auto object-cover rounded"
        />
      </td>
      <td className="px-2 py-1 text-gray-900 whitespace-nowrap lowercase">
        <IconButton
          variant="text"
          color="red"
          onClick={() =>
            categoryDelete(d?._id, d?.picture[0]?.publicId, d?.name)
          }
        >
          <TrashIcon className="w-5" />
        </IconButton>
      </td>
    </tr>
  ));
  return (
    <div>
      {/* --- all categories --- */}
      <div className="my-5">
        <div className="relative overflow-x-auto w-10/12 mx-auto">
          <table className="w-full text-sm  border">
            <thead className="text-xs bg-gray-50 ">
              <tr className="capitalize">
                <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
                  Category
                </th>
                <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
                  Picture
                </th>
                <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>{categories}</tbody>
          </table>
        </div>
      </div>

      {/* ----- category add --- */}
      {ctgError && <AlertError text={ctgError?.data?.message} />}
      {ctgDltError && <AlertError text={ctgDltError?.data?.message} />}

      <div className="w-11/12 max-w-lg mx-auto mt-5 mb-16">
        <Card className="shadow-lg p-10 bg-gray-100">
          <Typography variant="h4" color="blue-gray">
            Add a category
          </Typography>
          <form className="mt-8 mb-2 " onSubmit={createCategory}>
            <div className="mb-4 flex flex-col gap-6">
              <Input size="lg" label="name" name="name" required />
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 "
                  htmlFor="catgory_img"
                >
                  Category Image
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:border-blue-500 px-3 py-2"
                  id="catgory_img"
                  type="file"
                  name="image"
                  accept="image/*"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="mt-6 grid place-items-center"
              fullWidth
            >
              {ctgLoading ? <Spinner className="w-5" /> : "Create"}
            </Button>
          </form>
        </Card>
      </div>
      {(isLoading || ctgLoading || ctgDltLoad) && <LoaderFullScreen />}
    </div>
  );
};

export default AdmCategory;
