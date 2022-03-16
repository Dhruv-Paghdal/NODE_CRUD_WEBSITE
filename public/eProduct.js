const host=`http://localhost:${process.env.PORT || 3000}`;

let deleteProduct=async (id)=>{
    const url=`${host}/backend/editProduct/deleteProduct/${id}`;
    const response = await fetch(url, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json'
      },
    });
    window.location.href=response.url;
}

let updateProduct=async (id)=>{
    const url=`${host}/backend/editProduct/updateProduct/${id}`; 
    const response = await fetch(url, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      },
    });
    window.location.href=response.url;
}
