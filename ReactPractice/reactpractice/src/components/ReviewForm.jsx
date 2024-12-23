// import React, { useState } from 'react';
// import './Review';

// const ReviewForm = ({ closeForm }) => {
//   const [reviewText, setReviewText] = useState('');
//   const [rating, setRating] = useState(5);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Review:", reviewText);
//     console.log("Rating:", rating);
//     // Handle form submission logic here
//     closeForm(); // Close the form after submission
//   };

//   return (
//     <div className="review-form-container">
//       <form onSubmit={handleSubmit} className="review-form">
//         <h2>Write a Review</h2>
//         <label>
//           Rating:
//           <select value={rating} onChange={(e) => setRating(e.target.value)}>
//             <option value="5">5 - Excellent</option>
//             <option value="4">4 - Good</option>
//             <option value="3">3 - Average</option>
//             <option value="2">2 - Poor</option>
//             <option value="1">1 - Very Poor</option>
//           </select>
//         </label>
//         <label>
//           Review:
//           <textarea
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//             placeholder="Write your review here"
//             rows="4"
//           />
//         </label>
//         <button type="submit">Submit Review</button>
//         <button type="button" onClick={closeForm} className="close-button">Close</button>
//       </form>
//     </div>
//   );
// };

// export default ReviewForm;


import React, { useState, useEffect } from 'react';
import '../static/Review.css';

const ReviewForm = ({ closeForm, service_id, addReview }) => {
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [user_id, setUser_id] = useState(null); // State to hold user ID

  // Fetch user_id (replace this with your actual logic to fetch user_id)
  useEffect(() => {
    const fetchUserId = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.user) {
        setUser_id(user.user.user_uid);
      }
    };
    
    fetchUserId();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user_id) {
      console.error('User ID not available');
      return;
    }

    // Post the review to the API
    fetch(`http://localhost:5000/review/${user_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: service_id,
        comment: reviewText,
        rating: rating,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to submit review');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        // Call addReview to add the new review to the parent component's state
        addReview({
          review_uid: data.review_uid,
          service_id: service_id,
          comment: reviewText,
          rating: rating,
          user_uid: user_id
        });
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
      });
  };

  return (
    <div className="review-form-container">
      <form onSubmit={handleSubmit} className="review-form">
        <h2>Write a Review</h2>
        <label>
          Rating:
          <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Good</option>
            <option value="3">3 - Average</option>
            <option value="2">2 - Poor</option>
            <option value="1">1 - Very Poor</option>
          </select>
        </label>
        <label>
          Review:
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here"
            rows="4"
          />
        </label>
        <button type="submit">Submit Review</button>
        <button type="button" onClick={closeForm} className="close-button">Close</button>
        <button type="button" onClick={() => window.history.back()} className="back-button">Back</button> {/* Back button */}
      </form>
    </div>
  );
};

export default ReviewForm;
