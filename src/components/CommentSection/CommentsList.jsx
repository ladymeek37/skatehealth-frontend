import React from 'react';
import CommentsMapper from './CommentMapper';
import { useEffect } from 'react';
import "./Comments.css"


const CommentsList = ({getCommentsByTipId, comments}) => {

    useEffect(() => {
        getCommentsByTipId();
    }, []);

    return(
        <div className='commentsdisplay'>
            <CommentsMapper comments = {comments} className="comment"/>
        </div>
    )
}

export default CommentsList