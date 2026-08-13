 "use client";

import { useEffect, useState } from 'react'
 import Productcardpage from '../../shared/productcard/productcard'
import { productService } from '../../services/productService';
import styles from './productsPage.module.css' 

export default function ProductsPage() { 
  const [products,setProducts] = useState([]);
  useEffect( () => {
    const loadProducts = async ()=> {
    const productsData = await productService.getallProducts();
    setProducts(productsData);
    }
    loadProducts();
  },[]);
    return (
        <>
        <div className= {styles.layout}>
        <div className= {styles.productgrid}>
        {
            products.map ((product) => (
                <Productcardpage 
                key = {product.id}
                product = {product}
                />
            ))
        }
        </div>
        </div>
        </>
    )
}