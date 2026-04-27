import React from "react";

const CatData = ({ catdata }) => {
    const { img, name } = catdata;

    return (
        <div className="text-center">
            <div className="group">
                <img
                    src={img}
                    alt={name ? `${name} category image` : "Category image"}
                    loading="lazy"
                    decoding="async"
                    width="120"
                    height="96"
                    onError={(e) => {
                        e.currentTarget.src =
                            "https://via.placeholder.com/120x96?text=No+Image";
                    }}
                    className="
            rounded-2xl 
            w-[100px] h-[90px] 
            object-cover 
            mx-auto
            transition-transform duration-300
            group-hover:scale-105 hover:shadow-2xl cursor-pointer
          "
                />

                <h1 className="font-semibold text-sm mt-2 whitespace-nowrap">
                    {name}
                </h1>
            </div>
        </div>
    );
};

export default CatData;
