import React,{useState} from 'react';



const Context = React.createContext({
    candys:[],
})

export const ContextProvider = (props)=>{
    const [candys, setCandys]=useState([]);
    const [cartItems, setCartItems]=useState([]);

    const addCandyshandler = (item)=>{
        setCandys([...candys,item])
    }

    const addOnecandy = (item)=>{
        
    }

    const context = {
        candys:candys,
        addCandyshandler:addCandyshandler,
    }
    return(
        <Context.Provider value={context}>
            {props.children}
        </Context.Provider>
    )
}

export default Context;