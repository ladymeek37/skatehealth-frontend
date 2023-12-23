import React, { useState } from 'react';
import axios from 'axios';
import CommentsList from './CommentsList';
import CommentForm from './CommentForm';
import "./Comments.css"

const CommentsSection = ({tipId}) => {
    const [comments, setComments] = useState([])

    const getCommentsByTipId = async() => {
        try{
            await axios
            .get(`http://127.0.0.1:8000/api/comments/${tipId}/`)
            .then(response => {setComments(response.data);console.log(response.data)})
        } catch (error){
            console.log(error.response.data)
        }
    }

    return ( 
        <div className='commentscontainer'>
            <h2 className='item title'>Comments</h2>
            <CommentsList className='item' getCommentsByTipId ={getCommentsByTipId} tip = {tipId} comments = {comments}/>
            <CommentForm className='item' getCommentsByTipId = {getCommentsByTipId} tip = {tipId} />
        </div>
     );
}
 
export default CommentsSection;