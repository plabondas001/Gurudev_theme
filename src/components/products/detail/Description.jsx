import React from 'react'

const Description = ({ product }) => {
  return (
    <div>
       {product?.description && (
          <div className="mt-12 bg-white rounded-3xl p-8 shadow-lg border border-primary">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-primary w-fit">
              Product Description
            </h2>
            <div
              className="prose prose-lg max-w-none text-gray-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product?.description }}
            />
          </div>
        )}
    </div>
  )
}

export default Description
