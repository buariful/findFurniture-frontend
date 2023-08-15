import React from "react";
import DashboardTitle from "../component/shared/DashboardTitle";
import { useUserOrdersQuery } from "../features/user/userApi";
import PurchasedProducts from "../component/review/PurchasedProducts";
import { useUsersReviewQuery } from "../features/review/reviewApi";
import UserReviews from "../component/review/UserReviews";

const Review = () => {
  const { isLoading, error, data } = useUserOrdersQuery();
  const {
    isLoading: reviewLoading,
    error: reviewError,
    data: reviews,
    refetch,
  } = useUsersReviewQuery();

  const orderData = { isLoading, error, data };
  const reviewData = {
    isLoading: reviewLoading,
    error: reviewError,
    data: reviews,
  };

  let revProd_arrToObj = {};
  if (reviews?.data.length > 0) {
    for (const revProd of reviews?.data) {
      revProd_arrToObj[revProd?.product?._id] = revProd;
    }
  }
  return (
    <div className="w-11/12 mx-auto">
      <div className="mt-16 mb-8">
        <DashboardTitle text="product I've purchased" />
      </div>
      <PurchasedProducts
        orderData={orderData}
        reviewedProducts={revProd_arrToObj}
        refetchReview={refetch}
      />

      <div className="mt-16 mb-8">
        <DashboardTitle text="my all reviews" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mb-16 gap-5">
        <UserReviews reviewData={reviewData} />
      </div>
    </div>
  );
};

export default Review;
