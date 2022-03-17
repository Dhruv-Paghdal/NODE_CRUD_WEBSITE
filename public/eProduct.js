const deleteProduct=async (hostNumber,id)=>{
    const host=`http://localhost:${hostNumber}`;
    const url=`${host}/backend/editProduct/deleteProduct/${id}`;
    fetch(url, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response)=>window.location.href=response.url);
}

const updateProduct=async (hostNumber,id)=>{
    const host=`http://localhost:${hostNumber}`;
    const url=`${host}/backend/editProduct/updateProduct/${id}`; 
    fetch(url, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response)=>window.location.href=response.url);
}
