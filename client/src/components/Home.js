import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_GET_PRODUCTS  } from "../utils/queries";


export default function HomeList() {

    const { loading, data, error } = useQuery(QUERY_GET_PRODUCTS);

    console.log("HOME DATA IS---------------------");
	console.log(data)
	console.log("HOME LOADING IS " + loading);
	console.log("HOME ERROR IS--------------------")
	console.log(error)

    const homeData = data?.getProducts || { "Didnt Get": "The Data" };
    console.log(homeData)
    console.log(typeof homeData)
    // const productObject = storeData.products
	// console.log(productObject)
	// console.log("TYPE OF TESTING--------------")
	// console.log(typeof storeData, typeof productObject)

	let homeArray = [];

    if (data) {

        for (var key in homeData) {
            if (homeData.hasOwnProperty(key)) {
                console.log("Made it here")
                console.log(key)
                console.log(homeData[key])
    
                const homeDataStoreInfo = homeData[key].storeInfo
                console.log("THIS IS THE NESTED THING CHECK")
                console.log(homeDataStoreInfo._id)
                console.log(typeof homeDataStoreInfo)
    
    
                    homeArray.push([
                        // INDEX 0 product id
                        homeData[key]._id,
                        // INDEX 1 product title
                        homeData[key].productTitle,
                        // INDEX 2 product description
                        homeData[key].productDescription,
                        // INDEX 3 product image
                        homeData[key].productImage,
                        // INDEX 4 product price
                        homeData[key].productPrice,
                        // INDEX 5 product stock
                        homeData[key].stock,
                        // INDEX 6 product amount of likes
                        homeData[key].likes,
                        // INDEX 7 product tags
                        homeData[key].tags,
                        // INDEX 8 product created at time
                        homeData[key].createdAt,
                        // INDEX 9 store id
                        homeDataStoreInfo._id,
                        // INDEX 10 store title
                        homeDataStoreInfo.storeTitle,
                        // INDEX 11 store address
                        homeDataStoreInfo.address,
    
                    ])
    
    
                    console.log("P R O D U C T    P U S H     C H E C K --------")
                    console.log(homeArray)
                
                console.log("MADE IT THERE")
    
            }
        }
        console.log("THIS IS REVIEW ARRAYS")
        console.log(homeArray)

    }




}