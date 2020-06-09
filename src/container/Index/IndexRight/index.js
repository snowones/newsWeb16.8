import React, { useState, useEffect } from 'react';
import ImgBlockTypeOne from '../../component/ImgBlockTypeOne/index';
const IndexRight = props => {
    
    return (
       <div>
            <ImgBlockTypeOne width='100%' ImageWidth='100px' type='3' count={5} cartTitle='海贼王' componentType='2'/>
        </div>
    )
}
export default IndexRight;