import React, {useEffect} from "react";
import OrdersItem from "../../components/OrderItem/OrdersItem";
import styles from './Profile.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { storeType } from "../../utils/types";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../service/actions/constant';
import { getCookie } from '../../utils/getCookie';
import { authWsUrl } from "../../utils/apiUrl";


export default function ProfileOrder(){

    const dispatch = useDispatch()
    const ws = useSelector((store: storeType) => store.ws)

    useEffect(() => {
        dispatch({type: WS_CONNECTION_START, payload: `${authWsUrl}?token=${getCookie('authToken')?.replace('Bearer ', '')}`})
        return () => {dispatch({type: WS_CONNECTION_CLOSED})}
    }, [dispatch])

    if(!ws.get){
        return null
    }

    return(
            <div className={styles.ordersContainer}>
                {
                    ws.messages[0].orders?.map(item => 
                        <OrdersItem key={item._id} {...item}/>
                    )
                }
            </div>
    )
}