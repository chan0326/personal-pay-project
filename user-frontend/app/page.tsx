'use client';

import Banner from "./component/common/module/banner";
import RecommendedCourses from "./component/common/module/recommendedCourses";
import Footer from "./component/common/module/footer";
import Reviews from "./component/common/module/review";


export default function Home() {

  return  (
    <>
      <Banner />
      <RecommendedCourses />
      <Reviews />
      <Footer />
    </>
  );
}
