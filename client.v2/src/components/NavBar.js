import { Container, Navbar, Nav, Button, Col, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { AppContext } from './AppContext.js'
import { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import  '../styles/components/NavBar.scss'
const NavBar = observer(() => {
    const { user, basket } = useContext(AppContext)
    return (

        <Navbar  collapseOnSelect expand='sm' className='navbar fixed-top'>
            <Container fluid >
                {/* <NavLink to="/" className="navbar-brand">Магазин</NavLink> */}
                <Navbar.Brand href="/">Магазин</Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse>
                <Nav className="ms-auto">
                    <NavLink to="/delivery" className="nav-link">Доставка</NavLink>
                    <NavLink to="/contacts" className="nav-link">Контакты</NavLink>
                    {user.isAuth ? (
                        <NavLink to="/user" className="nav-link">Личный кабинет</NavLink>
                    ) : (
                        <>
                            <NavLink to="/login" className="nav-link">Войти</NavLink>
                            <NavLink to="/signup" className="nav-link">Регистрация</NavLink>
                        </>
                    )}
                    {user.isAdmin && (
                        <NavLink to="/admin" className="nav-link">Панель управления</NavLink>
                    )}
                    <NavLink to="/basket" className="nav-link">
                        Корзина
                        {!!basket.count && <span>({basket.count})</span>}
                    </NavLink>
                </Nav>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
    )
})

export default NavBar