import React from 'react'

const ListReviews = ({ reviews }) => {
    return (
        <div class="reviews w-75">
            <h3>ĐÁNH GIÁ SẢN PHẨM:</h3>
            <hr />
            {reviews && reviews.map(review => (
                <div key={review._id} class="review-card my-3">
                    <p class="review_user">
                        <figure className="avatar avatar-nav">
                            <img
                                src="https://thuthuattienich.com/wp-content/uploads/2017/02/anh-dai-dien-facebook-doc-2.jpg"
                                alt=''
                                className="rounded-circle"
                            />
                        </figure>
                        <b>{review.name}</b>&ensp;
                        <div class="rating-outer">
                            <div class="rating-inner" style={{ width: `${(review.rating / 5) * 100}%` }}></div>
                        </div>
                    </p>

                    <p class="review_comment text-primary">{review.comment}</p>

                    <hr />
                </div>
            ))}
        </div>
    )
}

export default ListReviews
