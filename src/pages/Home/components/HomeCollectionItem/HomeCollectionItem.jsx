import React from 'react';
import "./homeCollectionItem.scss";
import { useNavigate } from 'react-router-dom';

const HomeCollectionItem = ({ image, title, comment, reverse }) => {
    const navigate = useNavigate();

    return (
        <div
            className="row pt-3 g-0"
            style={{ flexDirection: reverse ? 'row-reverse' : 'row' }}
        >
            <div data-aos="fade-right" className="col-12 left-img col-md-4">
                <div className="collection-img">
                    <img src={image} alt={title} />
                </div>
            </div>

            <div data-aos="fade-left" className="collection-title col-12 col-md-8">
                <div className="title-content">
                    <h2>{title}</h2>
                    <p className='mt-3'>{comment}</p>

                    <button
                        onClick={() => navigate("/shop")}
                        className='general-button mt-4'
                    >
                        Коллекцияны көрүү
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomeCollectionItem;
