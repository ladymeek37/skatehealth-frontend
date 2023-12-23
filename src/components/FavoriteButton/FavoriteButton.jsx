import React, { useState } from 'react';
import useAuth from "../../hooks/useAuth";
import axios from 'axios';
import { GrFavorite } from 'react-icons/gr';
import "./FavoriteButton.css"


const FavoriteButton = (props) => {

    const [favorite, setFavorite] = useState(null);

    const [user, token] = useAuth();

    async function onClick(event) {

        event.preventDefault();

        await addToFavorites()

    }

    async function updateFavoriteCount(tipId) {
        try{
            console.log("Updating favorite count...")
            let response = await axios.patch(`http://127.0.0.1:8000/api/tips/favorite/${tipId}/`,
            {},
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
            );
            console.log(response);
        }catch(error) {
            console.log(error);
        }
    }

    async function addToFavorites() {
        await updateFavoriteCount(props.tipId);
        try{
            let response = await axios.post('http://127.0.0.1:8000/api/favorites/addfavorite/', 
            {
                tip_id: props.tipId
            },
            {
                headers: {
                    Authorization: "Bearer " + token,
                }
            })
            console.log("This is the response",response)
       

        } catch (error) {
            console.log("The api isn't working...", error.message)
        }
        await props.fetchTips();
    } 


    return ( 
        <div>
            <button className='addtofavbutton'>
            <GrFavorite onClick = {onClick} type = 'submit' className='favbutton'/>                 
            </button>


        </div>
     );
}
 
export default FavoriteButton;