import { tool } from '@langchain/core/tools';
import { NextResponse } from 'next/server';
import z from 'zod';
import Dish from '../models/Dish';

export const dishTool = tool(async(id:string) =>{
    try {
        const res = await Dish.findById(id);
        if(!res) return NextResponse.json({ message: "Not found" },{ status: 404 });

        return res;
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Server error" },{ status: 500 });
    }
},{
    name: "Find_Dish_And_Explain",
    description: "find dish and explain how to make",
    schema: z.object({
        id: z.string().describe("Id should string")
    })
})