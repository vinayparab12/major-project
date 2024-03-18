import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const Home = () => {
  useEffect(() => {
    localStorage.setItem('currentPage', 'home');
  }, []);
  return (
    <>
      <div className='Home-page d-flex flex-column justify-content-center align-items-center text-center vh-100' style={{ backgroundColor: 'white', color: 'black' }}>
        <div className='Home-div'>
          <h1 className='main-heading' style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '20px' }}>Welcome to</h1>
          <h1 className='main-heading' style={{ fontSize: '5rem', color: 'black', marginBottom: '20px' }}>Mock Interview</h1>
          <p className='description' style={{ fontSize: '1.2rem', maxWidth: '600px', marginBottom: '30px' }}>
            Supercharge your interview skills with our interactive mock interview platform. Practice, learn, and boost your confidence for that dream job.
          </p>
        </div>
        <div className='get-started'>
          <Link to="/getstarted">
            <button className='btn btn-primary btn-lg' style={{ backgroundColor: '#FFD700', borderColor: 'black', color: 'black' }}>Start Interview</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
