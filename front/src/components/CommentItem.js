import React from "react";

export default ({comment}) => {
    return (
        <li>
            <div>
                <p><strong>Nome:</strong> { comment.name }</p>
                <p><strong>E-mail:</strong> { comment.email }</p>
            </div>
            <p><strong>Comentário:</strong> { comment.body }</p>
        </li>
    )
}