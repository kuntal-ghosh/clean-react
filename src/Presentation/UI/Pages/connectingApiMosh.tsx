import axios, { AxiosError, CanceledError } from "axios";
import { useEffect, useState } from "react";
import { Layout } from "../Components/Layout";

interface User{
    name:string,
    id:string
}
export function ConnectApiMosh() {
    const [users,setUsers] =useState<User[]>([]);
    const [error,setError]=useState<AxiosError>();
    const [Loading,setLoading]=useState(false)
    const onDelete=(userId:string)=>{
        const originalUsers=[...users];
        const newUsers=users.filter(newUser=>newUser.id!==userId);
        setUsers(newUsers);
        axios
        .delete("https://jsonplaceholder.typicode.com/userss/"+ userId)
        .catch(err=>{
            if(err instanceof CanceledError)return;
            setError(err);
            setUsers(originalUsers);
        });

    }
    useEffect(()=>{
        const controller=new AbortController();
        setLoading(true);
        axios
        .get<User[]>("https://jsonplaceholder.typicode.com/users/",{signal:controller.signal})
        .then(res=>{
            setUsers(res.data)
        })
        .catch((err)=>{
            if(err instanceof CanceledError)return;
            setError(err);

        })
        .finally(()=>{
            setLoading(false);
        })
        ;
    
        return ()=>controller.abort();
    },[])
  return (
    <Layout>
      <main>
        <h1>Users</h1>
        {Loading && "loading"}
        {users.map(user=>(<div key={user.name+user.id}>{user.name}{" "} <button onClick={()=>onDelete(user.id)}>delete</button></div>))}
        {error && error.message}
        
      </main>
    </Layout>
  );
}
