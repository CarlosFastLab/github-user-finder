import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCircleNotch, faStar } from '@fortawesome/free-solid-svg-icons';

import '../styles/sidebar.css'

export default function SideBar({
    user,
    handleInputChange,
    handleSubmit,
    userSearch,
    loading,
    error,
    likedRepositories
}) {
    return (
        <div className="sidebar">
            <div className="sidebar__input-area">
                <form
                    className="sidebar__form"
                    onSubmit={handleSubmit}>
                    <FontAwesomeIcon
                        className="sidebar__icon"
                        icon={faSearch}
                        size="lg"
                    />
                    <input
                        className="sidebar__input"
                        type="text"
                        placeholder="digite o perfil do usuário"
                        value={userSearch}
                        onChange={handleInputChange}
                    />
                    <button
                        className='sidebar__input-button'
                        type='submit'
                        onClick={handleSubmit}>Buscar</button>
                </form>
            </div>
            {error === true ? <p className="sidebar__error">Usuário não existe</p> : false}
            {(loading &&
                <FontAwesomeIcon className="sidebar__loading"
                    icon={faCircleNotch}
                    pulse
                    size="lg"
                />
            )}

            <div
                className="sidebar__user"
                loading={loading ? 1 : 0}>
                {
                    Object.entries(user).length !== 0 || alert === false ?
                        (
                            <>
                                <img
                                    className="sidebar__img"
                                    src={user.avatar_url}
                                    alt={user.name} />
                                <h2 className="sidebar__item-heading">Usuário</h2>
                                <p className="sidebar__item">{user.login}, {user.location}</p>
                                <h2 className="sidebar__item-heading">Bio</h2>
                                <p className="sidebar__item">{user.bio}</p>
                                <h2 className="sidebar__item-heading">Link do perfil</h2>
                                <a
                                    href={user.html_url}
                                    className="sidebar__link">{user.html_url}</a>

                                <h2 className="sidebar__item-heading">Repositórios marcados com estrela</h2>
                                <section className="sidebar__repos">
                                    {likedRepositories.map(likedRepositories => (
                                        <div
                                            className="sidebar__repos-repo"
                                            key={likedRepositories.id}>
                                            <a
                                                className="sidebar__link"
                                                href={likedRepositories.html_url}>
                                                <div className='sidebar__link-icon'>
                                                    <FontAwesomeIcon
                                                        className="sidebar__link-icon"
                                                        icon={faStar}
                                                        size="1x"
                                                    />
                                                </div>
                                                {likedRepositories.name}
                                            </a>
                                        </div>
                                    ))}
                                </section>

                            </>
                        )
                        :
                        (
                            <p className="sidebar__message">Busque por um usuário</p>
                        )
                }
            </div>
        </div>
    );
}