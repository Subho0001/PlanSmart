// import React, { useState } from 'react';
// import Navbar from './Navbar';
// import Footer from './Footer';
// import ReviewForm from './ReviewForm';
// import '../static/Review.css';

// const Review = () => {
//   const [showReviewForm, setShowReviewForm] = useState(false);

//   const toggleReviewForm = () => {
//     setShowReviewForm(!showReviewForm);
//   };

//   return (
//     <div className="venue-page">
      
//       <div className="venue-container">
//         <div className="venue-image-section">
//           <img src="/path-to-your-venue-image.jpg" alt="Venue" />
//         </div>
//         <div className="venue-details-section">
//           <h1 className="venue-title">Beautiful Event Venue</h1>
//           <p className="venue-price">
//             <span className="current-price">$500</span>
//             <span className="discounted-price">$600</span> <span className="discount-percent">-20%</span>
//           </p>
//           <div className="rating">
//             ⭐⭐⭐⭐⭐ 4.6/5
//           </div>
//           <p className="venue-description">
//             A beautiful venue perfect for various events, offering a comfortable and stylish experience.
//           </p>
//           <div className="booking-section">
//             <button className="book-now-button">Book Now</button>
//           </div>
//           <div className="write-review-section">
//             <button className="write-review-button" onClick={toggleReviewForm}>Write a Review</button>
//           </div>
//         </div>
//       </div>
//       {showReviewForm && <ReviewForm closeForm={toggleReviewForm} />}
      
//     </div>
//   );
// };

// export default Review;

// import React, { useState, useEffect } from 'react';
// import Navbar from './Navbar';
// import Footer from './Footer';
// import ReviewForm from './ReviewForm';
// import '../static/Review.css';
// import { useLocation } from 'react-router-dom';

// const Review = () => {
//   const [showReviewForm, setShowReviewForm] = useState(false);
//   const [reviews, setReviews] = useState([]); // State to hold fetched reviews
//   const [loading, setLoading] = useState(true); // Loading state for API call
//   const location = useLocation();
  
//   const toggleReviewForm = () => {
//     setShowReviewForm(!showReviewForm);
//   };

//   useEffect(() => {
//     const serviceDetails = location.state?.vendorDetails;

//     if (serviceDetails?.service_id) {
//       fetch(`http://localhost:5000/review/service/${serviceDetails.service_id}`)
//         .then((response) => response.ok ? response.json() : Promise.reject('No reviews found'))
//         .then((data) => {
//           setReviews(data);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error('Error fetching reviews:', error);
//           setReviews([]);
//           setLoading(false);
//         });
//     } else {
//       console.error('Service ID not provided');
//       setLoading(false);
//     }
//   }, [location.state?.vendorDetails]);

//   return (
//     <div className="venue-page">
//       <div className="reviews-section">
//         <h2>Reviews</h2>
//         {loading ? (
//           <p>Loading reviews...</p>
//         ) : reviews.length > 0 ? (
//           <div className="reviews-list">
//             {reviews.map((review) => (
//               <div key={review.review_uid} className="review-card">
//                 <p className="review-comment">{review.comment}</p>
//                 <div className="review-rating">Rating: {review.rating}/5</div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No Reviews Yet</p>
//         )}
//       </div>
//       <div className="write-review-section">
//         <button className="write-review-button" onClick={toggleReviewForm}>Write a Review</button>
//       </div>

//       {showReviewForm && (
//         <ReviewForm
//           closeForm={toggleReviewForm}
//           service_id={location.state?.vendorDetails?.service_id}
//         />
//       )}
//     </div>
//   );
// };

// export default Review;


import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ReviewForm from './ReviewForm';
import '../static/Review.css';
import { useLocation } from 'react-router-dom';

const Review = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState([]); // State to hold fetched reviews
  const [loading, setLoading] = useState(true); // Loading state for API call
  const location = useLocation();

  const toggleReviewForm = () => {
    setShowReviewForm(!showReviewForm);
  };

  useEffect(() => {
    const serviceDetails = location.state?.vendorDetails;

    if (serviceDetails?.service_id) {
      fetch(`http://localhost:5000/review/service/${serviceDetails.service_id}`)
        .then((response) => response.ok ? response.json() : Promise.reject('No reviews found'))
        .then((data) => {
          setReviews(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching reviews:', error);
          setReviews([]);
          setLoading(false);
        });
    } else {
      console.error('Service ID not provided');
      setLoading(false);
    }
  }, [location.state?.vendorDetails]);

  // Function to add a new review to the list of reviews
  const addReview = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
    setShowReviewForm(false); // Hide the review form after submission
  };

  return (
    <div className="venue-page">
      <div className="reviews-section">
        <h2>Reviews</h2>
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length > 0 ? (
          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.review_uid} className="review-card">
                <p className="review-comment">{review.comment}</p>
                <div className="review-rating">Rating: {review.rating}/5</div>
              </div>
            ))}
          </div>
        ) : (
          <p>No Reviews Yet</p>
        )}
      </div>
      <div className="write-review-section">
        <button className="write-review-button" onClick={toggleReviewForm}>Write a Review</button>
        <button type="button" onClick={() => window.history.back()} className="back-button">Back</button> {/* Back button */}
      </div>

      {showReviewForm && (
        <ReviewForm
          closeForm={toggleReviewForm}
          service_id={location.state?.vendorDetails?.service_id}
          addReview={addReview} // Pass addReview function to ReviewForm
        />
      )}
    </div>
  );
};

export default Review;



