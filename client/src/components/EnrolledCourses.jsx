import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card as AntCard, Button } from "antd";
const { Meta } = AntCard;

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfoJSON = localStorage.getItem('userInfo');
        setCourses(JSON.parse(userInfoJSON).favCourses);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [courses]);

  const DescriptionCell = ({ description }) => {
    const [readMore, setReadMore] = React.useState(false);

    const toggleReadMore = () => {
      setReadMore(!readMore);
    };

    const displayText = readMore ? description : description.slice(0, 80);
    
    console.log(courses)
    return (
      <div>
        <p>{displayText}</p>
        {description.length > 80 && (
          <Button type="link" onClick={toggleReadMore}>
            {readMore ? "See less" : "See more"}
          </Button>
        )}
      </div>
    );
  };

  return (
    <div>
      {/* Courses Offered */}
      <div class="flex items-center justify-center">
        <h1 className="md:text-3xl text-2xl font-medium leading-tight pt-10 mt-20">
          <span className="text-orange font-bold"> Enrolled Courses</span>
        </h1>
      </div>
      {/* Course Card Section */}
      <div className=" container mx-auto py-8 px-10 mt-10"> {/* Adjusted z-index to a positive value */}

  <div className="grid gap-6 md:grid-cols-3 mt-10">
    {courses.length ? courses?.map((course, index) => (
      <Link to={`/course/${course._id}`} key={index}>
        <AntCard className="rounded-xl border border-spacing-3 shadow-md hover:shadow-lg transition duration-300">
          <div className="aspect-w-3 aspect-h-2">
            <img
              alt="course"
              src={course.imageUrl}
              className="object-cover w-[500px] h-[200px]"
            />
          </div>
          <Meta
            title={
              <h2 className="text-lg font-semibold text-orange mt-10">
                {course.title}
              </h2>
            }
            description={
              <div>
                <p className="text-sm text-gray-700 mb-2">
                Description: {course.duration}
                </p>
                <p className="text-sm text-black text-gray-700">
                  <DescriptionCell description={course.description} />
                </p>
              </div>
            }
          />
          <Link to={`/course/${course._id}`}>
            <Button type="default" className="bg-purple ml-5 text-white mt-4">
              Learn More
            </Button>
          </Link>
        </AntCard>
      </Link>
    )) : "No courses have been enrolled"}
  </div>
</div>

    </div>
  );
};

export default CoursesPage;
