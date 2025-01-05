
// import React from 'react';

// const MyCard = ({ productInformation, color }) => {
//     return (
//         <div
//             class='card'
//             style={{ width: '18rem' }}>
//             <span
//                 style={{
//                     backgroundColor: color,
//                     // className="badge"
//                 }}
//                 className='badge position-absolute top-0'>
//                 {productInformation.productName}
//             </span>


//             <div class='card-body'>
//                 <div className='d-flex justify-content-between'>
//                     <h5 class='card-title'>{productInformation.productName}</h5>
//                 </div>
//                 <div className="absolute top-2 left-2 text-white py-1 px-3 rounded text-xs" style={{ backgroundColor: color }}>
//                     {productInformation.productCategory}
//                 </div>
//                 <a
//                     href='#'
//                     class='btn btn-outline-dark w-100'>
//                     {productInformation.productName}
//                 </a>
//             </div>
//         </div>
//     );
// };

// export default MyCard;
import React from 'react';

const MyCard = ({ productInformation, color }) => {
    return (
        <div className="card" style={{ border: '1px solid #E0E0E0', borderRadius: '10px', padding: '16px', backgroundColor: '#FFF', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <input type="checkbox" id={productInformation.productId} name={productInformation.productName} />
                    <label htmlFor={productInformation.productId}>
                        <h5 style={{ margin: 0, fontWeight: 'bold' }}>{productInformation.productName}</h5>
                        <p style={{ margin: 0 }}>{productInformation.productCategory}</p>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default MyCard;
