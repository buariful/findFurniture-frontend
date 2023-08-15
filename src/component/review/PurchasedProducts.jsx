import React from "react";
import { Button, Textarea } from "@material-tailwind/react";
import { LoaderFullScreen, LoaderSmall } from "../../utils/Loader";
import { useState } from "react";
import {
  PencilSquareIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import Modal from "../../utils/Modal";
import { AlertError } from "../../utils/Alert";
import {
  useAddReviewMutation,
  useUpdateReviewMutation,
} from "../../features/review/reviewApi";
import { ToastError, ToastSuccess } from "../../utils/Toast";
import ReactStars from "react-stars";

const PurchasedProducts = ({ orderData, reviewedProducts, refetchReview }) => {
  const { isLoading, error, data } = orderData;
  const [addReview, { isLoading: addRev_loading }] = useAddReviewMutation();
  const [updateReview, { isLoading: upRev_loading }] =
    useUpdateReviewMutation();
  const [reviewModal, setReviewModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [prodForReview, setProdForReview] = useState();
  const [review, setReview] = useState({
    rating: null,
    comment: null,
    product: null,
    reviewId: null,
  });
  const handleReviewModal = (matchingReview, prod) => {
    setReview({ rating: null, comment: null, product: null, reviewId: null });
    setProdForReview(prod);
    if (matchingReview) {
      setReview((prev) => ({
        ...prev,
        rating: matchingReview?.rating,
        comment: matchingReview?.comment,
        reviewId: matchingReview?._id,
      }));
    }
    setReview((prev) => ({ ...prev, product: prod?._id }));
    setReviewModal(true);
  };
  const reviewAddUpdate = (isReviewUpdating) => {
    const data = {
      product: review.product,
      comment: review.comment,
      rating: review.rating,
    };
    if (isReviewUpdating) {
      const updatedRevData = { reviewId: review.reviewId, data };
      updateReview(updatedRevData)
        .then((res) => {
          ToastSuccess(res?.data?.message);
          refetchReview();
        })
        .catch((err) => ToastError(err?.data?.message));
    } else {
      addReview(data)
        .then((res) => {
          if (res?.data?.success) {
            ToastSuccess(res?.data?.message);
          } else {
            ToastError(res?.error?.data?.message);
          }
          refetchReview();
        })
        .catch((err) => {
          ToastError(err?.data?.message);
        });
    }

    setReviewModal(false);
  };

  const isProductExist = (_id) => {
    return products.some((product) => product._id === _id);
  };
  if (data?.data?.length > 0) {
    data?.data?.forEach((order) => {
      if (order?.isDelivered) {
        order?.products?.forEach((prod) => {
          if (!isProductExist(prod?._id)) {
            setProducts((prevProducts) => [...prevProducts, prod]);
          }
        });
      }
    });
  }

  let myProducts = "ddd";
  if (products?.length > 0) {
    myProducts = products?.map((prod) => {
      const matchingReview = reviewedProducts[prod?.item?._id];
      console.log("matchingReview", matchingReview);
      return (
        <tr className="bg-white border-b" key={prod?._id}>
          <td className="px-2 py-4 text-gray-900 whitespace-nowrap">
            <img
              src={prod?.item?.images[0]?.url}
              alt=""
              className="w-[50px] rounded mx-auto"
            />
          </td>
          <td className="px-2 py-4 text-gray-900 whitespace-nowrap">
            {prod?.item.name}
          </td>
          <td className="px-2 py-4 text-gray-900 whitespace-nowrap">
            {prod?.item?.brand}
          </td>
          <td className="px-2 py-4 text-gray-900 whitespace-nowrap">
            {prod?.item?.category}
          </td>
          <td className="px-2 py-4 font-semibold">
            {matchingReview ? (
              <Button
                className="flex items-center mx-auto p-2 text-[10px] gap-2"
                variant="outlined"
                onClick={() => {
                  // setProdForReview(prod);
                  handleReviewModal(matchingReview, prod?.item);
                }}
              >
                <ChatBubbleOvalLeftEllipsisIcon className="w-4" />
                My review
              </Button>
            ) : (
              <Button
                className="flex items-center mx-auto p-2 text-[10px] gap-2"
                onClick={() => {
                  handleReviewModal(null, prod?.item);
                }}
              >
                <PencilSquareIcon className="w-4" />
                Add a review
              </Button>
            )}
          </td>
        </tr>
      );
    });
  }
  if (isLoading) {
    myProducts = (
      <tr>
        <td colSpan={5}>
          <LoaderSmall />
        </td>
      </tr>
    );
  }
  if (error) {
    myProducts = (
      <tr>
        <td colSpan={5}>
          <AlertError
            text={error?.data?.message ? error?.data?.message : error?.error}
          />
        </td>
      </tr>
    );
  }
  return (
    <>
      <div className="relative overflow-x-auto w-10/12 mx-auto">
        <table className="w-full text-sm  border">
          <thead className="text-xs uppercase bg-gray-50 ">
            <tr className="">
              <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
                Picture
              </th>
              <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
                Product name
              </th>

              <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
                Brand
              </th>
              <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
                Category
              </th>
              <th scope="col" className="px-2 py-4 whitespace-nowrap text-sm">
                Review
              </th>
            </tr>
          </thead>

          <tbody className="capitalize">{myProducts}</tbody>
        </table>
      </div>

      {/* ------ modal ------ */}
      <Modal isModalOpen={reviewModal} setModal={setReviewModal}>
        <div className="flex justify-center items-center gap-5 border-b border-b-blue-gray px-6 pb-2 text-gray-700 w-[380px] mx-auto">
          <img
            src={prodForReview?.images[0]?.url}
            alt=""
            className="w-[100px]"
          />
          <div>
            <p className="text-base font-semibold capitalize">
              {prodForReview?.name}
            </p>
            <p>
              Code:{" "}
              <span className="font-semibold text-sm">
                {prodForReview?.productCode}
              </span>
            </p>
          </div>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <ReactStars
              count={5}
              size={34}
              value={review?.rating}
              color2={"#FF9933"}
              half={true}
              onChange={(e) =>
                setReview((prevReview) => ({ ...prevReview, rating: e }))
              }
            />

            {review?.rating && (
              <span className=" bg-blue-500 text-white py-1 px-3 inline-block rounded text-[12px]">
                {review?.rating}
              </span>
            )}
          </div>

          <Textarea
            label="Review"
            value={review?.comment ? review?.comment : ""}
            onChange={(e) =>
              setReview((prevReview) => ({
                ...prevReview,
                comment: e.target.value,
              }))
            }
          />
        </div>
        <div className="flex justify-center">
          {review?.reviewId ? (
            <Button onClick={() => reviewAddUpdate(true)}>Update</Button>
          ) : (
            <Button onClick={() => reviewAddUpdate(false)}>Submit</Button>
          )}
        </div>
      </Modal>

      {(addRev_loading || upRev_loading) && <LoaderFullScreen />}
    </>
  );
};

export default PurchasedProducts;
