import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import "./ProfilePage.css"

import axios from "axios";

const ProfilePage = () => {

    const [user, token] = useAuth();
    const [tips, setTips] = useState([]);

    useEffect(() => {

        fetchUserTips();
      }, [token]);

        const fetchUserTips = async () => {
        try {
          let response = await axios.get("http://127.0.0.1:8000/api/tips/", {
            headers: {
                Authorization: "Bearer " + token,
            },
          });
          setTips(response.data);
          console.log(response.data);
        } catch (error) {
          console.log(error.response.data);
        }
      };


      async function deleteTip(tip) {

        try{
            let response = await axios.delete(`http://127.0.0.1:8000/api/tips/${tip.id}/`, {
                headers: {
                Authorization: "Bearer " + token,
            }, 
            })
            console.log("This is the response",response)
            fetchUserTips();

        } catch (error) {
            console.log("The api isn't working...", error.message)
        }
      };

    //   async function editTip(tip) {

    //     try{
    //         let response = await axios.put(`http://127.0.0.1:8000/api/tips/${tip.id}/`, tip, {
    //             headers: {
    //                 Authorization: "Bearer" + token,
    //             },
    //         })
    //         console.log("This is the response", response)
    //         fetchUserTips();
    //     } catch (error) {
    //         console.log("The api isn't working...", error.message)
    //     }
    //   };
      
      return(
        <div className="container parent">
        <div>
            <h1 className="yourpoststext"> Your Posts:</h1>
        </div>
        {tips.length > 0 ? ( <div>
            {tips &&
                tips.map((tip) => {
                  return(
                    <body className="child">
                      <div key={tip.id}>
                        <div className="name-date-favorite">
                          <h3>@{tip.user.username}</h3>
                          <p>{tip.date} </p>                          
                        </div>

                        <h1>{tip.title}</h1> 
                        <h4 className="profilecategory">{tip.category_display} </h4>
                        {tip.image_url ? <img className='item'src = {`http://127.0.0.1:8000${tip.image_url}`} alt={``}/> : null} 
                        <p className="favitem">{tip.text} </p>
                        <a className="favitem" href={tip.link} target="_blank">{tip.link}</a>
                      </div>
                    <button type = "submit" className="profilebutton" onClick = {() => deleteTip(tip)}>DELETE</button>
                    <Link to = {`/editpost/${tip.id}`}> 
                        <button className="favitem profilebutton" >EDIT</button> 
                    </Link>
                    </body> 
                )
              }
          ).reverse()}
        </div> ) : (<div> <p className="notiptext">You haven't posted any tips yet!</p></div>) }
          </div>
      )
};

export default ProfilePage;
