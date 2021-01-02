import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import '../styles/header.css';

export default function Header() {
    return (
        <header className='header'>
            <div className='header__elements'>
                <FontAwesomeIcon
                    className='header__icon'
                    icon={faGithub}
                    color='#36eeeb'
                    autoReverse
                    size='4x'
                />
                <h1 className='header__text'>GitHub User Finder</h1>
            </div>
        </header>
    );
}