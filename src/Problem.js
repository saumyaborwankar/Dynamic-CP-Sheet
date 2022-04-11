import React from "react";

const Problem = ({key,title,solved}) => {
    
    return(
        <div>
            <h1>{title}</h1>
            <h2>Solved = {solved}</h2>
        </div>
    )
};

export default Problem;