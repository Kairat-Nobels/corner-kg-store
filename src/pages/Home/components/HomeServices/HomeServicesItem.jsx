import React from 'react';

const HomeServicesItem = (props) => {
    const { image, title } = props;

    return (
        <div className="col-12 col-md-3 d-flex flex-column align-items-center text-center py-3">
            <div
                className="services-img mb-3"
                style={{
                    background: '#7ca37d', // мягкий зелёный вместо розового
                    borderRadius: '50%',
                    width: 80,
                    height: 80,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 14px rgba(124, 163, 125, 0.15)',
                    transition: '0.3s ease'
                }}
            >
                <img
                    src={image}
                    alt=""
                    style={{
                        width: 44,
                        height: 44,
                        objectFit: 'contain'
                    }}
                />
            </div>

            <h6
                style={{
                    color: '#2f4a38', // тёмно-зелёный текст
                    fontWeight: 500,
                    fontSize: '1.08rem'
                }}
            >
                {title}
            </h6>
        </div>
    );
};

export default HomeServicesItem;
