import instance from "../Interceptor/interceptor";

export const token = "7ba28fd99cf99393c57d796ef80869a17bb6fb2b1d9d21ff02de0ed0711489c7";

const ApiServices ={
    getIdData:(id)=>{
        const url = id ? `/users/${id}` :"/users";
        return instance.get(url)
    },
    getData:()=>{
        return instance.get("/users");
    },
    createData:(customerData)=>{
        console.log("hi");
        return instance.post("/users",customerData);

    },
    putData:(id,customerData)=>{
        return instance.put(`/users/${id}`,customerData);
    },
    deleteData:(id)=>{
        return instance.delete(`/users/${id}`);
    }
}

export default ApiServices;