import React from 'react';

export const CommentsPresenter =({comment}) => {
    return (
        <ul className='comment'> 
            <p className='commentitem username'> {comment.user.username}:</p>
            <p className='commentitem text'> {comment.text}</p>
        </ul>         

    )
}

const CommentsMapper = ({comments}) => {
    return(
        <div>
        <li>
            {comments.map(comment => <CommentsPresenter key = {comment.id} comment = {comment} />)}
        </li>         
        </div>

    )
}

export default CommentsMapper