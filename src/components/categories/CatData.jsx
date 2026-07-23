import React from "react";
import { Link } from "react-router";

const CatData = ({ catdata }) => {
    const { img, logo, name, slug, id } = catdata;
    const catImage = img || logo || "/Img/logo/logo.png";
    const catSlug = slug || id;

    return (
        <Link to={`/category/${catSlug}`} className="text-center block">
            <div className="group">
                <img
                    src={catImage}
                    alt={name ? `${name} category image` : "Category image"}
                    loading="lazy"
                    decoding="async"
                    width="140"
                    height="120"
                    onError={(e) => {
                        e.currentTarget.src =
                            "https://via.placeholder.com/120x96?text=No+Image";
                    }}
                    className="
            rounded-2xl 
            w-[120px] h-[105px]
            md:w-[140px] md:h-[120px]
            object-contain object-center
            p-2 bg-white
            mx-auto
            transition-transform duration-300
            group-hover:scale-105 hover:shadow-2xl cursor-pointer
          "
                />

                <h3 className="font-semibold text-sm mt-2 whitespace-nowrap text-gray-900 group-hover:text-primary transition-colors">
                    {name}
                </h3>
            </div>
        </Link>
    );
};

export default CatData;
