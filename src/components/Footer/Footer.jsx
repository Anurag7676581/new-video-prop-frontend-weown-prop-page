import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import houseImg from './buyhouse.png';
import homeImg from './home.png';
import brand from './brand.png';
import Linker from './Linker';




function Footer(){

    return(
        
        <div className={styles.main}>
            <div className={styles.images}>
                <img className={styles.img1} src={houseImg} alt="" />
                <img className={styles.img2} src={homeImg} alt="" />
            </div>
            <div className={styles.content}>
                <div className={styles.logo}>
                    <img className={styles.brand} src={brand} alt="" />
                </div>
                <div className={styles.links}>
                    <Linker/>
                    <Linker/>
                    <Linker/>

                </div>
                <div className={styles.copyrights}>
                    <div className={styles.foot}>
                    <h2 className={styles.text}>2024weown.All rights reserved</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Footer;
