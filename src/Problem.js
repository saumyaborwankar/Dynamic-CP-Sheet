import React from "react";

const Problem = ({title,solved,link}) => {
    
    return(
        <tr>
            {/* <table>
                <tr>
                    <th>Problem</th>
                    <th>Solved</th>
                </tr> */}
                
                    <td><a href={link} target="_blank">{title}</a></td>
                    <td>{solved}</td>
                
                {/* </table> */}
            {/* <h1>{title}</h1>
            <h2>Solved = {solved}</h2> */}
        </tr>
    )
};

export default Problem;