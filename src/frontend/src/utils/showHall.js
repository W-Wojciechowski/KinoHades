import React, {useState} from 'react';

export default function  ShowHall( {chairs, rowNumber, columnsList} ) {

    return <div>
        {rowNumber}&nbsp;
        {columnsList.map((column) => (
            chairs[column + ( rowNumber - 1) * columnsList.length] ? (
                    chairs[column + ( rowNumber - 1) * columnsList.length].image
                ) : ( <></> )
        ))}
        {/*{chairs[1 + ( rowNumber - 1) * 10] ? (*/}
        {/*    chairs[1 + ( rowNumber - 1) * 10].image*/}
        {/*) : ( <></> )}*/}
        {/*{chairs[2 + ( rowNumber - 1) * 10]  ? (*/}
        {/*    chairs[2 + ( rowNumber - 1) * 10].image*/}
        {/*) : ( <></> )}*/}
        {/*{chairs[3 + ( rowNumber - 1) * 10] ? (*/}
        {/*    chairs[3 + ( rowNumber - 1) * 10].image*/}
        {/*) : ( <></> )}*/}
        {/*{chairs[4 + ( rowNumber - 1) * 10]  ? (*/}
        {/*    chairs[4 + ( rowNumber - 1) * 10].image*/}
        {/*) : ( <></> )}*/}
        {/*{chairs[5 + ( rowNumber - 1) * 10] ? (*/}
        {/*    chairs[5 + ( rowNumber - 1) * 10].image*/}
        {/*) : ( <></> )}*/}
        {/*{chairs[6 + ( rowNumber - 1) * 10] ? (*/}
        {/*    chairs[6 + ( rowNumber - 1) * 10].image*/}
        {/*) : ( <></> )}*/}
        {/*{chairs[7 + ( rowNumber - 1) * 10] ? (*/}
        {/*    chairs[7 + ( rowNumber - 1) * 10].image*/}
        {/*) : ( <></> )}*/}
        {/*{chairs[8 + ( rowNumber - 1) * 10] ? (*/}
        {/*    chairs[8 + ( rowNumber - 1) * 10].image*/}
        {/*) : ( <></> )}*/}
        {/*{chairs[9 + ( rowNumber - 1) * 10] ? (*/}
        {/*    chairs[9 + ( rowNumber - 1) * 10].image*/}
        {/*) : ( <></> )}*/}
        {/*{chairs[10 + ( rowNumber - 1) * 10] ? (*/}
        {/*    chairs[10 + ( rowNumber - 1) * 10].image*/}
        {/*) : ( <></> )}*/}
        &nbsp; {rowNumber}
    </div>
};