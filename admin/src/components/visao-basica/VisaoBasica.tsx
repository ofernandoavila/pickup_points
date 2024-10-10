import { Link } from 'react-router-dom';
import './_visao-basica.scss';
import { IVisaoBasicaProps } from './types';

export default function VisaoBasica({ children }: IVisaoBasicaProps) {
    return (
        <div id="visao-basica">
            <header>
                <div className="navbar navbar-expand-lg bg-body-tertiary">
                    <div className="container">
                        <div className="d-flex justify-content-between align-items-center">
                            <Link to={'/'} className='navbar-brand'>Pickup Points</Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <ul className="navbar-nav">
                                <li className="nav-item"><Link to="/" className="nav-link active">Dashboard</Link></li>
                                <li className="nav-item"><Link to="/pickup-points" className="nav-link">Pickup Points</Link></li>
                                <li className="nav-item"><Link to="/settings" className="nav-link">Settings</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div className="container">
                    { children }
                </div>
            </main>
        </div>
    );
}