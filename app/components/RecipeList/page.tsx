"use client";

import { UseDishStore } from "@/app/store/UseDishStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const RecipeList = () =>{
    const router = useRouter();
    const { recipes, fetchRecipe, loading } = UseDishStore();

    useEffect(()=>{
        fetchRecipe();
    },[]);

    return (
        <div className="flex justify-between" >
            {/* <button className="w-fit px-4 py-1.5 text-2xl font-medium bg-blue-500 cursor-pointer rounded-md border-0" onClick={()=>router.push('/components/new')} >Add New</button> */}
            { loading ? <p>Loading...</p> : (
                <div className="card" >
                    { recipes.map((data, index) =>(
                        <div key={index} >
                            <h1>{data.name} </h1>
                            <p>{data.ingredients} </p>
                            <p>{data.steps}</p>
                        </div>
                    )) }
                </div>
            ) }
        </div>
    )
}