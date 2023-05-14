import React,{useEffect, useState} from 'react';



const Context = React.createContext({
    candys:[],
})

export const ContextProvider = (props)=>{
    const [candys, setCandys]=useState([]);
    const [cartItems, setCartItems]=useState([]);

    // function for getting &  storing candies to database -----------
    
    const getdataofcandys = async ()=>{
        try{
            const response = await fetch('https://ritik-http-default-rtdb.firebaseio.com/candys.json')
            if(!response.ok){
                throw new Error('Something went wrong....')
            }
            const data = await response.json()
            console.log('data while get',data)
            if(data){
                setCandys(data)
            }
        }
        catch(error){
            alert(error.message)
        }
       
    }
    useEffect(()=>{
        
        getdataofcandys();
        
    },[])

    const addCandyshandler = (item)=>{
        setCandys([...candys,item])
    }


    const postcandystodatabase = async ()=>{
        try{
            const response = await fetch('https://ritik-http-default-rtdb.firebaseio.com/candys.json',{
                method:'PUT',
                body:JSON.stringify(candys),
                headers:{
                    'Content-Type': 'application/json'
                }
                })
                if(!response.ok){
                    throw new Error('Something went wrong....')
                }
                const data = await response.json()
                console.log('data while post',data)
        }
       catch(error){
        alert(error.message)
       }
    }

    useEffect(()=>{
        
        postcandystodatabase()
        
    },[candys])

    // ------------------------------logic of storing candys end




    // function get and put data to database ----------
    const getdataofcartItems = async ()=>{
        try{
            const response = await fetch('https://ritik-http-default-rtdb.firebaseio.com/cartItem.json')
            if(!response.ok){
               throw new Error('Something went wrong....')
           }
           const data = await response.json()
           console.log('data while get',data)
           if(data){
               setCartItems(data)
           }
        }
        catch(error){
            alert(error.message)
        }
        
    }
    useEffect(()=>{
        
        getdataofcartItems();
        
    },[])

    

    const postCarttodatabase = async ()=>{
        try{
            const response = await fetch('https://ritik-http-default-rtdb.firebaseio.com/cartItem.json',{
                method:'PUT',
                body:JSON.stringify(cartItems),
                headers:{
                    'Content-Type': 'application/json'
                }
                })
                if(!response.ok){
                    throw new Error('Something went wrong....')
                }
                const data = await response.json()
                console.log('data while post',data)
        }
        catch(error){
            alert(error.message)
        }
       
    }

    useEffect(()=>{
        
            postCarttodatabase()
        
    },[cartItems])
// ------------------------logic of storing cartItems ends here


//  logic for adding into cart -------------------
    const addtocart = (item, num)=>{
        console.log('in addtocart',item, num, typeof(num))
        const exsitingcandyIndex= cartItems.findIndex(
            (prevItem)=> prevItem.id == item.id
            )
        const exstingcandy = cartItems[exsitingcandyIndex]
        console.log('exsistingcandy',exstingcandy)
        let updatedItems;
        if(exstingcandy){
            let updatedItem = {
                ...exstingcandy,
                quantity: exstingcandy.quantity + num
            }
            updatedItems = [...cartItems]
            updatedItems[exsitingcandyIndex]=updatedItem
            setCartItems(updatedItems)
        }
        else{
            let newItem={...item, quantity:num}
            setCartItems([...cartItems,newItem])
        }
    }
//---------------------adding into cart logic ends here

// logic of removing cart-------------------
    const removeItem = (id)=>{
        const exsitingcandyIndex = cartItems.findIndex(
            (prevItem)=> prevItem.id === id
        )
        const existingcandy = cartItems[exsitingcandyIndex]
        let updatedItems;
        if(existingcandy.quantity === 1){
            updatedItems = cartItems.filter(
                    (item)=> item.id !== id
                )
                setCartItems(updatedItems)
        }
        else{
            let updatedItem = {
                ...existingcandy,
                quantity: existingcandy.quantity - 1,
            }
            updatedItems=[...cartItems]
            updatedItems[exsitingcandyIndex]=updatedItem;
            setCartItems(updatedItems)
        }
    }
//---------------------logic of removing from cart ends here
    
    console.log('cartItems',cartItems)
    const context = {
        candys:candys,
        cartItems:cartItems,
        addCandyshandler:addCandyshandler,
        addtocart:addtocart,
        removeItem:removeItem,
    }
    return(
        <Context.Provider value={context}>
            {props.children}
        </Context.Provider>
    )
}

export default Context;