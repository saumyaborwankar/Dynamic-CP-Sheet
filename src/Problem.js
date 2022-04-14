import React from "react";

const Problem = ({title,solved,topic,link}) => {
    const trueStyle = {background: 'green',color : 'green', fontSize:'23px'}
    const falseStyle = {background: 'red',color : 'red', fontSize:'23px'}


    return(
        <tr>
            {/* <table>
                <tr>
                    <th>Problem</th>
                    <th>Solved</th>
                </tr> */}
                    <td>{topic}</td>
                    <td><a href={link} target="_blank">{title}</a></td>
                    
                    {solved==='true' ? <td style={trueStyle}></td>:<td style={falseStyle}></td>}
                
                {/* </table> */}
            {/* <h1>{title}</h1>
            <h2>Solved = {solved}</h2> */}
        </tr>
    )
};

export default Problem;