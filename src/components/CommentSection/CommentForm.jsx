import React, { useState } from 'react';
import useAuth from "../../hooks/useAuth"
import axios from 'axios';
import './Comments.css'

const CommentForm = ({tip, getCommentsByTipId}) => {
    const [user, token] = useAuth();
    const [comment, setComment] = useState('');

    async function onSubmit(event) {
        event.preventDefault();
        const formValuesObject = {
            tip_id: tip,
            text: comment,
        }
        sendComment(formValuesObject)
        console.log(formValuesObject)
    }

    async function sendComment(newComment){
        try{
            await axios.post('http://127.0.0.1:8000/api/comments/newcomment/', newComment, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            .then(response => getCommentsByTipId())
            .then(response => console.log("This is the new comment", response))
            .then(setComment(""))
        } catch (error) {
            console.log("The API isn't working...", error.message)
        }
    }

    return ( 
        <form onSubmit={onSubmit}>
            <div className='commentform'>
                <label class='formitem addcomment'>Add comment:</label>
                <input class='formitem' type = "string" className = "form-control" value = {comment} onChange={(event) => setComment(event.target.value)} />
                <button class = 'formitem formbutton' type = "submit">Submit</button>
            </div>
        </form>
    );
}
 
export default CommentForm;