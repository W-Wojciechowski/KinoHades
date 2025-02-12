function fetchService(url, request, token , requestBody ){

    const FetchData = {
        headers:{
            "Content-Type": "application/json"
        },
        method: request
    }

    if(token === "temp" ){
        FetchData.headers.Authorization = `Temp`
    }else if (token) {
        FetchData.headers.Authorization = `Bearer ${token}`
    }


    if (requestBody) {
        FetchData.body = JSON.stringify(requestBody)
    }

    return  fetch(url,FetchData).then((response) => {
        if (response.status === 200) return response.json();
    })

}
export  {fetchService}